import { google } from "googleapis";
import { NextRequest } from "next/server";
import { createErrorResponse, createResponse } from "../result";
import { GenerateTimeLineInput } from "./dto";
import { generateObject, streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { youtubeVideosSchema } from "@/schema/youtube-videos";

export async function POST(req: NextRequest) {
	const { channelId, keywords } = (await req.json()) as GenerateTimeLineInput;

	const youtube = google.youtube({
		version: "v3",
		auth: process.env.GOOGLE_API_KEY,
	});

	const searchResult = await youtube.search.list({
		part: ["id"],
		channelId: channelId,
		type: ["video"],
		q: keywords.join("|"),
		maxResults: 10,
	});
	if (!searchResult.data.items)
		return createErrorResponse("Videos search data is empty", 404);

	const videoIds = searchResult.data.items
		.map((item) => item.id?.videoId)
		.filter(Boolean) as string[];

	const videosResult = await youtube.videos.list({
		part: ["snippet"],
		id: videoIds,
		// maxResults: 50,
	});
	if (!videosResult.data.items)
		return createErrorResponse("Videos data is empty", 404);

	const videos = videosResult.data.items.reduce(
		(result, item) => {
			const { publishedAt, title, description, thumbnails } =
				item.snippet ?? {};

			result[item.id!] = {
				id: item.id!,
				publishedAt: publishedAt!,
				title: title!,
				description: description!,
				thumbnailUrl: thumbnails?.default?.url!,
			};

			return result;
		},
		{} as {
			[id: string]: {
				id: string;
				publishedAt: string;
				title: string;
				description: string;
				thumbnailUrl: string;
			};
		},
	);

	const videosForPrompt = Object.values(videos).map((video) => ({
		id: video.id,
		title: video.title,
		description: video.description,
	}));

	const keywordFilteringResult = await streamObject({
		model: openai("gpt-4o-2024-08-06"),
		mode: "json",
		schemaName: "youtube_video_topic_based_filtering",
		schemaDescription: "Return filtered data related to topic keywords",
		system:
			"Once the topic keyword and YouTube video data set are entered, Judgment is made based on the title and description. If the contents of the description and title are different, the description is ignored and judgment is made based on the title . As a result all video data sets related to the topic keyword are filtered. If it is somewhat relevant, include it in the results.",
		prompt: `topic_keywords:${JSON.stringify(keywords)}, data:${JSON.stringify(videosForPrompt)}`,
		schema: youtubeVideosSchema,
	});

	return keywordFilteringResult.toTextStreamResponse();
}

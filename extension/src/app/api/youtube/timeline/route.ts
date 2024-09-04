import { google } from "googleapis";
import { NextRequest } from "next/server";
import { createErrorResponse } from "../result";
import { generateText, streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { youtubeVideosSchema } from "@/schema/youtube-videos";
import { GenerateTimeLineInput } from "@/dto/youtube.dto";

const SYSTEM_PROMPT = {
	topicDescription: `
	You are an expert in generating keywords for YouTube video searches. The user will provide a description of a specific topic they want to explore. Your task is to generate the most accurate and specific keyword that captures the essence of the topic described by the user. This keyword will be used to search for videos on a specific YouTube channel.

	The keyword must:
	- Be specific and concise.
	- Accurately represent the core topic of the user's description.
	- Filter out irrelevant content by being focused.
	- Avoid including terms like years (e.g., "2024") or overly broad terms.

	For example:
	User input: "I want to know the future of the Korean real estate market."
	Generated keyword: "Korean real estate market outlook"
	`,
};

export async function POST(req: NextRequest): Promise<Response> {
	const { channelId, topicDescription, dateRange } =
		(await req.json()) as GenerateTimeLineInput;

	const { text: keyword, usage } = await generateText({
		model: openai("gpt-4o-mini"),
		system: SYSTEM_PROMPT.topicDescription,
		prompt: topicDescription,
	});

	console.log("Generated keyword:", keyword);
	console.log("Keyword token usage:", usage);

	const youtube = google.youtube({
		version: "v3",
		auth: process.env.GOOGLE_API_KEY,
	});

	const videosInfoRes = await youtube.search.list({
		part: ["id"],
		channelId: channelId,
		type: ["video"],
		q: keyword,
		maxResults: 10,
		publishedBefore: dateRange.endDate,
		publishedAfter: dateRange.startDate,
	});
	if (!videosInfoRes.data.items)
		return createErrorResponse("Videos search data is empty", 404);

	const videoIds = videosInfoRes.data.items
		.map((item) => item.id?.videoId)
		.filter(Boolean) as string[];

	const videosRes = await youtube.videos.list({
		part: ["snippet"],
		id: videoIds,
		// maxResults: 50,
	});
	if (!videosRes.data.items)
		return createErrorResponse("Videos data is empty", 404);

	const videos = videosRes.data.items.map((video) => {
		const { id, snippet } = video;
		const { publishedAt, title, description, thumbnails } = snippet!;

		return {
			id: id!,
			publishedAt: publishedAt!,
			title: title!,
			description: description!,
			thumbnailUrl: thumbnails?.default?.url!,
		};
	});

	// 최적화에 필요
	const videosById = videosRes.data.items.reduce(
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

	const prompt = Object.values(videos).map((video) => ({
		id: video.id,
		title: video.title,
		description: video.description,
	}));

	const filtered = await streamObject({
		model: openai("gpt-4o-mini"),
		mode: "json",
		schemaName: "youtube_video_topic_based_filtering",
		schemaDescription: "Return filtered data related to topic keywords",
		system:
			"Once the topic keyword and YouTube video data set are entered, Judgment is made based on the title and description. If the contents of the description and title are different, the description is ignored and judgment is made based on the title . As a result all video data sets related to the topic keyword are filtered. If it is somewhat relevant, include it in the results.",
		prompt: `topic_keyword:${keyword}, data:${JSON.stringify(videos)}`,
		schema: youtubeVideosSchema,
		onFinish(event) {
			console.log("Filter token usage:", event.usage);
		},
	});

	return filtered.toTextStreamResponse();
}

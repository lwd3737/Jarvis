"use server";

import { GenerateTimeLineOutput } from "@/dto/youtube.dto";
import { youtubeVideosSchema } from "@/schema/youtube-videos";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { google } from "googleapis";

export async function generateTimeLineAction(input: {
	channelId: string;
	keywords: string[];
}) {
	"use server";

	const youtube = google.youtube({
		version: "v3",
		auth: process.env.GOOGLE_API_KEY,
	});

	const searchResult = await youtube.search.list({
		part: ["id"],
		channelId: input.channelId,
		type: ["video"],
		q: input.keywords.join("|"),
		maxResults: 10,
	});
	if (!searchResult.data.items) throw new Error("Videos search data is empty");
	// return createErrorResponse("Videos search data is empty", 404);

	const videoIds = searchResult.data.items
		.map((item) => item.id?.videoId)
		.filter(Boolean) as string[];

	const videosResult = await youtube.videos.list({
		part: ["snippet"],
		id: videoIds,
		// maxResults: 50,
	});
	if (!videosResult.data.items) throw new Error("Videos data is empty");
	// return createErrorResponse("Videos data is empty", 404);

	const videos = videosResult.data.items.map((video) => {
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
	// const videos = videosResult.data.items.reduce(
	// 	(result, item) => {
	// 		const { publishedAt, title, description, thumbnails } =
	// 			item.snippet ?? {};

	// 		result[item.id!] = {
	// 			id: item.id!,
	// 			publishedAt: publishedAt!,
	// 			title: title!,
	// 			description: description!,
	// 			thumbnailUrl: thumbnails?.default?.url!,
	// 		};

	// 		return result;
	// 	},
	// 	{} as {
	// 		[id: string]: {
	// 			id: string;
	// 			publishedAt: string;
	// 			title: string;
	// 			description: string;
	// 			thumbnailUrl: string;
	// 		};
	// 	},
	// );

	// const videosForPrompt = Object.values(videos).map((video) => ({
	// 	id: video.id,
	// 	title: video.title,
	// 	description: video.description,
	// }));

	const stream = createStreamableValue<any, GenerateTimeLineOutput>();

	const keywordFilteringResult = await streamObject({
		model: openai("gpt-4o-2024-08-06"),
		mode: "json",
		schemaName: "youtube_video_topic_based_filtering",
		schemaDescription: "Return filtered data related to topic keywords",
		system:
			"Once the topic keyword and YouTube video data set are entered, Judgment is made based on the title and description. If the contents of the description and title are different, the description is ignored and judgment is made based on the title . As a result all video data sets related to the topic keyword are filtered. If it is somewhat relevant, include it in the results.",
		prompt: `topic_keywords:${JSON.stringify(input.keywords)}, data:${JSON.stringify(videos)}`,
		schema: youtubeVideosSchema,
	});

	// for await (const chunk of keywordFilteringResult.partialObjectStream) {
	// 	console.log(chunk);
	// 	if (chunk.videos) stream.update({ videos: chunk.videos });
	// }

	const reader = keywordFilteringResult.partialObjectStream.getReader();

	reader.read().then(function processObject({ done, value }) {
		if (done) {
			stream.done();
			return;
		}

		stream.update({ videos: value.videos });
	});

	return { object: stream.value };
}

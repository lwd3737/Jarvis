import { z } from "zod";

export type YoutubeVideos = z.infer<typeof youtubeVideosSchema>["videos"];

export const youtubeVideosSchema = z.object({
	videos: z.array(
		z.object({
			id: z.string(),
			publishedAt: z.string(),
			title: z.string(),
			description: z.string(),
			thumbnailUrl: z.string(),
		}),
	),
});

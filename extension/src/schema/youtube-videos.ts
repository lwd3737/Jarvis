import { z } from "zod";

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

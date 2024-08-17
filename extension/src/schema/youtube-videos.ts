import { z } from "zod";

export const youtubeVideosSchema = z.object({
	videos: z.array(
		z.object({
			id: z.string(),
		}),
	),
});

import { GenerateTimeLineInput, YoutubeVideoDto } from "@/dto/youtube.dto";

export async function generateTimeline(
	input: GenerateTimeLineInput,
	init?: RequestInit,
) {
	return await fetch("/api/youtube/timeline", {
		...init,
		method: "POST",
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
		body: JSON.stringify(input),
	});
}

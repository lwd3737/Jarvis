import { GenerateTimeLineInput, YoutubeVideoDto } from "@/dto/youtube.dto";
import { FailureResult } from "../result";

export async function streamTimelineApi(
	input: GenerateTimeLineInput,
	init?: RequestInit,
): Promise<ReadableStream> {
	const res = await fetch("/api/youtube/timeline", {
		method: "POST",
		body: JSON.stringify(input),
		headers: {
			"Content-Type": "application/json",
		},
		...init,
	});
	if (res.ok) {
		const { error } = (await res.json()) as FailureResult;
		throw new Error(error.message);
	}

	return res.body as ReadableStream;
}

export async function generateTimeline(
	input: GenerateTimeLineInput,
	init?: RequestInit,
) {
	const res = await fetch("/api/youtube/timeline", {
		method: "POST",
		body: JSON.stringify(input),
		headers: {
			"Content-Type": "application/json",
		},
		...init,
	});
	if (res.ok) {
		const { error } = (await res.json()) as FailureResult;
		throw new Error(error.message);
	}

	return (await res.json()) as { videos: YoutubeVideoDto[] };
}

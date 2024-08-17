import { GenerateTimeLineInput } from "./dto";

export async function generateTimeline(input: GenerateTimeLineInput) {
	const res = await fetch("/api/youtube/timeline", {
		method: "POST",
		body: JSON.stringify(input),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

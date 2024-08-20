import { Result } from "../result";
import { YoutubeChannelDto } from "../../../../dto/youtube.dto";

export async function getChannels(
	query: string,
): Promise<Result<{ channels: YoutubeChannelDto[] }>> {
	const res = await fetch(`/api/youtube/channel?query=${query}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

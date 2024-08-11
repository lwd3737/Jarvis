import { Result } from "../result";
import { ChannelDto } from "./dto";

export async function getChannels(
	query: string,
): Promise<Result<{ channels: ChannelDto[] }>> {
	const res = await fetch(`/api/youtube/channel?query=${query}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

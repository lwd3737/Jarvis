import { handleResponse } from "../result";
import { ChannelDto } from "./dto";

export async function getChannels(query: string) {
	const res = await fetch(`/api/youtube/channel?query=${query}`);
	return await handleResponse<{ channels: ChannelDto[] }>(res);
}

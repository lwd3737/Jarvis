"use client";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import ChannelSearch from "./ChannelSearch";
import { useCallback, useState } from "react";
import SearchResultList from "./SearchResultList";

export default function TimeLineGeneratorForm() {
	const [channels, setChannels] = useState<ChannelDto[]>([]);
	const isSearchResultOpen = channels.length > 0;

	const handleChannelsLoaded = (channels: ChannelDto[]) => {
		setChannels(channels);
	};

	const handleClose = useCallback(() => {
		setChannels([]);
	}, []);

	return (
		<form className="px-5">
			<section>
				<ChannelSearch onChannelsLoaded={handleChannelsLoaded} />
				{isSearchResultOpen && (
					<SearchResultList channels={channels} onClose={handleClose} />
				)}
			</section>
		</form>
	);
}

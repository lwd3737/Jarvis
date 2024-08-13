"use client";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import ChannelSearch from "./ChannelSearch";
import { useCallback, useState } from "react";
import SearchResultList from "./SearchResultList";
import Image from "next/image";
import SelectedChannelSection from "./SelectedChannelSection";

export default function TimeLineGeneratorForm() {
	const [channels, setChannels] = useState<ChannelDto[]>([]);
	const isSearchResultOpen = channels.length > 0;

	const handleChannelsLoaded = (channels: ChannelDto[]) => {
		setChannels(channels);
	};

	const handleClose = useCallback(() => {
		setChannels([]);
	}, []);

	const [selectedChannel, setSelectedChannel] = useState<ChannelDto | null>(
		null,
	);

	const handleSelectChannel = (channel: ChannelDto) => {
		setSelectedChannel(channel);
		setChannels([]);
	};

	const handleCancelChannel = () => {
		setSelectedChannel(null);
	};

	return (
		<form className="px-5">
			{selectedChannel ? (
				<SelectedChannelSection
					channel={selectedChannel}
					onCancel={handleCancelChannel}
				/>
			) : (
				<>
					<ChannelSearch onChannelsLoaded={handleChannelsLoaded} />
					{isSearchResultOpen && (
						<SearchResultList
							channels={channels}
							onClose={handleClose}
							onSelectChannel={handleSelectChannel}
						/>
					)}
				</>
			)}
		</form>
	);
}

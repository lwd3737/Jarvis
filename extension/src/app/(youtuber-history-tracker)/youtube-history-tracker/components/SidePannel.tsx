"use client";
import React, { useState } from "react";
import ChannelSearch from "./ChannelSearch";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import SearchResultList from "./SearchResultList";

export default function SidePannel() {
	const [channels, setChannels] = useState<ChannelDto[]>([]);

	const handleChannelsLoaded = (channels: ChannelDto[]) => {
		setChannels(channels);
	};

	return (
		<aside className="border-r border-r-gray-200 border-solid w-[20%] min-w-[220px] h-full overflow-auto">
			<ChannelSearch onChannelsLoaded={handleChannelsLoaded} />
			<SearchResultList channels={channels} />
		</aside>
	);
}

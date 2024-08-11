"use client";
import React, { useState } from "react";
import ChannelSearch from "./ChannelSearch";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import Image from "next/image";

export default function SidePannel() {
	const [channels, setChannels] = useState<ChannelDto[]>([]);

	const handleChannelsLoaded = (channels: ChannelDto[]) => {
		setChannels(channels);
	};

	return (
		<aside className="border-r border-r-gray-200 border-solid w-[20%] min-w-[220px] h-full overflow-auto">
			<ChannelSearch onChannelsLoaded={handleChannelsLoaded} />
			<ul className="flex flex-col gap-y-3">
				{channels.map((channel) => {
					return (
						<li className="flex flex-col items-center" key={channel.channelId}>
							<Image
								src={channel.thumbnailUrl!}
								width={200}
								height={150}
								alt={channel.channelTitle}
							/>
							<div className="flex flex-col px-4 py-2 gap-y-2">
								<h2 className="w-full font-bold">{channel.channelTitle}</h2>
								<p className="text-[12px]">{channel.description}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}

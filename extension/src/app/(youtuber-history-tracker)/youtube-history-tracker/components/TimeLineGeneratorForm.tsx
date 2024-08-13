"use client";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import ChannelSearch from "./ChannelSearch";
import { useCallback, useState } from "react";
import SearchResultList from "./SearchResultList";
import Image from "next/image";

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

	const handleUndoChannel = () => {
		setSelectedChannel(null);
	};

	return (
		<form className="px-5">
			<section>
				{selectedChannel ? (
					<div>
						<div className="flex justify-between">
							<h1 className="text-lg font-bold">선택된 채널</h1>
							<button
								className="text-[12px] text-red-500"
								onClick={handleUndoChannel}
							>
								변경
							</button>
						</div>
						<hr />
						<div className="flex py-2 gap-x-3">
							<Image
								src={selectedChannel.thumbnailUrl!}
								width={80}
								height={80}
								alt={selectedChannel.channelTitle}
							/>
							<div className="flex flex-col py-2 gap-y-2">
								<h2 className="font-semibold text-[14px]">
									{selectedChannel.channelTitle}
								</h2>
								<p className="font-thin text-[12px]">
									{selectedChannel.description}
								</p>
							</div>
						</div>
					</div>
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
			</section>
		</form>
	);
}

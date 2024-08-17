"use client";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import ChannelSearch from "./ChannelSearch";
import { FormEvent, useCallback, useState } from "react";
import SearchResultList from "./SearchResultList";
import SelectedChannelFieldSection from "./SelectedChannelFieldSection";
import TopicFieldSection from "./TopicFieldSection";
import { generateTimeline } from "@/app/api/youtube/timeline/fetch";
import { isFailure } from "@/app/api/youtube/result";

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

	const [addedTopicKeywords, setAddedTopicKeywords] = useState<string[]>([]);

	const handleAddTopicKeyword = (keyword: string) => {
		setAddedTopicKeywords((prev) => [...prev, keyword]);
	};

	const handleRemoveTopicKeyword = () => {
		setAddedTopicKeywords([]);
	};

	const handleGenerateTimeLineSubmit = async (
		ev: FormEvent<HTMLFormElement>,
	) => {
		ev.preventDefault();

		if (!selectedChannel) {
			return alert("채널을 선택해주세요.");
		}
		if (addedTopicKeywords.length === 0) {
			return alert("주제를 선택해주세요.");
		}

		const res = await generateTimeline({
			channelId: selectedChannel.channelId,
			keywords: addedTopicKeywords,
		});
		if (isFailure(res)) return;

		console.log(res.data);
	};

	return (
		<form
			className="flex flex-col px-5 gap-y-10"
			onSubmit={handleGenerateTimeLineSubmit}
		>
			{selectedChannel ? (
				<SelectedChannelFieldSection
					channel={selectedChannel}
					onCancel={handleCancelChannel}
				/>
			) : (
				<section>
					<ChannelSearch onChannelsLoaded={handleChannelsLoaded} />
					{isSearchResultOpen && (
						<SearchResultList
							channels={channels}
							onClose={handleClose}
							onSelectChannel={handleSelectChannel}
						/>
					)}
				</section>
			)}

			<TopicFieldSection
				addedKeywords={addedTopicKeywords}
				onAddKeyword={handleAddTopicKeyword}
				onRemoveKeyword={handleRemoveTopicKeyword}
			/>

			<button className="bg-blue-500 hover:bg-blue-600 rounded-3xl h-[50px] text-white">
				타임라인 생성
			</button>
		</form>
	);
}

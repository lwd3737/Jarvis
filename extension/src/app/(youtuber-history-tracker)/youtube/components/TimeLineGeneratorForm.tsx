"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ChannelSearch from "./ChannelSearch";
import { FormEvent, useCallback, useState } from "react";
import SearchResultList from "./SearchResultList";
import SelectedChannelFieldSection from "./SelectedChannelFieldSection";
import TopicFieldSection from "./TopicFieldSection";
import { useRouter } from "next/navigation";
import { useTimeLine } from "../providers/TimeLineProvider";
import { YoutubeChannelDto } from "@/dto/youtube.dto";
import DateRangePicker, { DateRange } from "./DateRangePicker";

export default function TimeLineGeneratorForm() {
	const router = useRouter();
	const { setParams } = useTimeLine();

	const [channels, setChannels] = useState<YoutubeChannelDto[]>([]);
	const isSearchResultOpen = channels.length > 0;

	const handleChannelsLoaded = (channels: YoutubeChannelDto[]) => {
		setChannels(channels);
	};

	const handleClose = useCallback(() => {
		setChannels([]);
	}, []);

	const [selectedChannel, setSelectedChannel] =
		useState<YoutubeChannelDto | null>(null);

	const handleSelectChannel = (channel: YoutubeChannelDto) => {
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

	const [dateRange, setDateRange] = useState<DateRange>({
		startDate: undefined,
		endDate: new Date(),
	});

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

		setParams({
			channel: selectedChannel,
			keywords: addedTopicKeywords,
			dateRange,
		});

		router.push(`/youtube/timeline`);
	};

	return (
		<form
			className="relative flex flex-col gap-y-10 px-5 pb-[200px] h-full"
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

			<DateRangePicker
				range={dateRange}
				onChange={(range) => setDateRange(range)}
			/>

			<button className="right-10 bottom-5 left-10 fixed bg-blue-500 hover:bg-blue-600 rounded-3xl h-[50px] text-white">
				타임라인 생성
			</button>
		</form>
	);
}

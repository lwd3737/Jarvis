"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ChannelSearch from "./ChannelSearch";
import { FormEvent, useCallback, useState } from "react";
import SearchResultList from "./SearchResultList";
import SelectedChannelFieldSection from "./SelectedChannelFieldSection";
import TopicDescriptionFieldSection from "./TopicDescriptionFieldSection";
import { useRouter } from "next/navigation";
import { useTimeLine } from "../providers/TimeLineProvider";
import { YoutubeChannelDto } from "@/dto/youtube.dto";
import DateRangePicker, { DateRange } from "./DateRangePicker";

export default function TimeLineGeneratorForm() {
	const router = useRouter();
	const { params, setParams } = useTimeLine();

	const [channels, setChannels] = useState<YoutubeChannelDto[]>([]);
	const isSearchResultOpen = channels.length > 0;

	const handleChannelsLoaded = (channels: YoutubeChannelDto[]) => {
		setChannels(channels);
	};

	const handleClose = useCallback(() => {
		setChannels([]);
	}, []);

	const [selectedChannel, setSelectedChannel] =
		useState<YoutubeChannelDto | null>(params?.channel ?? null);

	const handleSelectChannel = (channel: YoutubeChannelDto) => {
		setSelectedChannel(channel);
		setChannels([]);
	};

	const handleCancelChannel = () => {
		setSelectedChannel(null);
	};

	const [topicDescription, setTopicDescription] = useState<string>("");

	const [dateRange, setDateRange] = useState<DateRange>(
		params?.dateRange ?? {
			startDate: undefined,
			endDate: new Date(),
		},
	);

	const handleGenerateTimeLineSubmit = async (
		ev: FormEvent<HTMLFormElement>,
	) => {
		ev.preventDefault();

		if (!selectedChannel) {
			return alert("채널을 선택해주세요.");
		}

		if (!topicDescription) {
			alert("주제에 대한 설명을 입력해주세요.");
			return;
		}

		setParams({
			channel: selectedChannel,
			topicDescription: topicDescription,
			dateRange,
		});

		router.push(`/youtube/timeline`);
	};

	return (
		<form
			className="relative flex flex-col gap-y-5 px-5 pb-[200px] w-1/2 min-w-[400px]"
			onSubmit={handleGenerateTimeLineSubmit}
		>
			<section>
				{selectedChannel ? (
					<SelectedChannelFieldSection
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
			</section>

			<section>
				<TopicDescriptionFieldSection
					description={topicDescription}
					onChange={(desc) => setTopicDescription(desc)}
				/>
			</section>

			<section className="">
				<DateRangePicker
					range={dateRange}
					onChange={(range) => setDateRange(range)}
				/>
			</section>

			<button className="p-3 font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-3xl">
				타임라인 생성
			</button>
		</form>
	);
}

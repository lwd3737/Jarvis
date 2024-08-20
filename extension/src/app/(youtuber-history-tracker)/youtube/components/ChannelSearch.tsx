"use client";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import { getChannels } from "@/app/api/youtube/channel/fetch";
import { isFailure } from "@/app/api/youtube/result";
import React, { ChangeEventHandler, FormEvent, MouseEvent } from "react";

interface Props {
	onChannelsLoaded: (channels: ChannelDto[]) => void;
}

// TODO: 페이지네이션 + 무한 스크롤 구현
export default function ChannelSearch(props: Props) {
	const [query, setQuery] = React.useState("");

	const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
		setQuery(ev.target.value);
	};

	const handleSubmit = (ev: MouseEvent) => {
		ev.preventDefault();

		getChannels(query).then((result) => {
			if (isFailure(result)) {
				console.error(result.error);
				return;
			}

			console.log(result, result);

			props.onChannelsLoaded(result.data.channels);
		});
	};

	return (
		<fieldset className="flex justify-between border-gray-200 border border-solid rounded-lg h-[50px]">
			<input
				className="flex-1 h-full px-3"
				value={query}
				onChange={handleQueryChange}
				placeholder="채널 이름"
			/>
			<button
				className="w-[50px] h-full font-bold text-[13px] hover:text-gray-500"
				onClick={handleSubmit}
			>
				검색
			</button>
		</fieldset>
	);
}

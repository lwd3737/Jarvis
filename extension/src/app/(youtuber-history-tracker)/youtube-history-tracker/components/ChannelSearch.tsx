"use client";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import { getChannels } from "@/app/api/youtube/channel/fetch";
import { isFailure } from "@/app/api/youtube/result";
import React, { ChangeEventHandler, FormEvent } from "react";

interface Props {
	onChannelsLoaded: (channels: ChannelDto[]) => void;
}

// TODO: 페이지네이션 + 무한 스크롤 구현
export default function ChannelSearch(props: Props) {
	const [query, setQuery] = React.useState("");

	const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
		setQuery(ev.target.value);
	};

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
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
		<form
			className="border-gray-200 border-b border-solid h-[50px]"
			onSubmit={handleSubmit}
		>
			<input
				className="px-3 w-[80%] h-full"
				value={query}
				onChange={handleQueryChange}
				placeholder="채널 이름"
			/>
			<button className="w-[20%] text-[13px] hover:text-blue-300">검색</button>
		</form>
	);
}

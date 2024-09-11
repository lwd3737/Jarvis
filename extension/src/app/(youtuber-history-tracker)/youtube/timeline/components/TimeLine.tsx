"use client";
import { useCallback, useEffect, useMemo } from "react";
import new__useGenerateTimeLine from "../hooks/useGenerateTimeLine.new";
import VideoInfoCard from "./VideoInfoCard";
import TimeLineBar from "./TimeLineBar";

interface Props {}

export default function TimeLine(props: Props) {
	const { isLoading, metadata, videos, submit, stop, isStreaming } =
		new__useGenerateTimeLine();

	useEffect(() => {
		submit();
		return () => stop();
	}, []);

	const sorted = useMemo(() => {
		const copy = [...videos!];
		copy.sort(
			(a, b) => Date.parse(a!.publishedAt!) - Date.parse(b!.publishedAt!),
		);
		return copy;
	}, [videos]);

	return (
		<div
			className="flex w-full py-5 pl-5 overflow-x-auto bg-white h-fullpx-10 rounded-3xl"
			style={{
				scrollbarWidth: "none",
			}}
		>
			<div
				className="items-end gap-y-10 grid grid-rows-[1fr_auto]"
				style={{
					gridTemplateColumns: `repeat(${videos!.length}, 1fr)`,
				}}
			>
				{sorted.map((video, idx) => {
					return (
						<VideoInfoCard
							key={video!.id}
							isStreaming={isStreaming(idx)}
							{...video!}
						/>
					);
				})}

				<section
					className="grid items-end"
					style={{
						gridColumn: `span ${videos!.length}`,
					}}
				>
					<TimeLineBar dates={sorted.map((video) => video.publishedAt)} />
				</section>
			</div>

			<section className="flex items-center px-5">
				<button
					className="px-3 py-2 text-sm text-white bg-blue-400 rounded-lg text-nowrap"
					onClick={() => submit()}
				>
					더 보기
				</button>
			</section>
		</div>
	);
}

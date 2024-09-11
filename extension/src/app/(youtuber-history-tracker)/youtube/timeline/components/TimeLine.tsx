"use client";
import { useCallback, useEffect, useMemo } from "react";
import useGenerateTimeLine from "../hooks/useGenerateTimeLine";
import VideoInfoCard from "./VideoInfoCard";
import TimeLineBar from "./TimeLineBar";

interface Props {}

export default function TimeLine(props: Props) {
	const { isLoading, metadata, videos, submit, stop, isStreaming } =
		useGenerateTimeLine();

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
			className="flex bg-white h-fullpx-10 py-5 pl-5 rounded-3xl w-full overflow-x-auto"
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
					className="items-end grid"
					style={{
						gridColumn: `span ${videos!.length}`,
					}}
				>
					<TimeLineBar dates={sorted.map((video) => video.publishedAt)} />
				</section>
			</div>

			<section className="flex items-center px-5">
				<button
					className="bg-blue-400 px-3 py-2 rounded-lg text-nowrap text-sm text-white"
					onClick={() => submit()}
				>
					더 보기
				</button>
			</section>
		</div>
	);
}

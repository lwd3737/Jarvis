"use client";
import { useEffect, useMemo } from "react";
import useGenerateTimeLine from "../hooks/useGenerateTimeLine";
import VideoInfoCard from "./VideoInfoCard";
import TimeLineBar from "./TimeLineBar";

interface Props {}

export default function TimeLine(props: Props) {
	const {
		isLoading,
		metadata,
		videos,
		isStreaming,
		stop,
		generate,
		generateMore,
	} = useGenerateTimeLine();

	useEffect(() => {
		generate();
		return () => {
			// stop();
		};
	}, [generate, stop]);

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
					className="border-[3px] border-blue-400 border-solid rounded-lg w-[50px] h-[50px] text-[40px] text-blue-400 text-nowrap leading-[1.25]"
					onClick={() => generateMore()}
				>
					+
				</button>
			</section>
		</div>
	);
}

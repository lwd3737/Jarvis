"use client";
import { useCallback, useEffect, useMemo } from "react";
import useGenerateTimeLine from "../hooks/useGenerateTimeLine";
import new__useGenerateTimeLine from "../hooks/useGenerateTimeLine.new";

interface Props {}

export default function TimeLine(props: Props) {
	const { metadata, videos, submit } = new__useGenerateTimeLine();

	useEffect(() => {
		submit();
	}, []);

	// return <button onClick={() => submit()}>again</button>;

	// const { isLoading, videos, isVideoStreaming, renderThumbnailImage } =
	// 	useGenerateTimeLine({ thunmbnail: { height: 200 } });

	const sorted = useMemo(() => {
		const copy = [...videos!];
		copy.sort(
			(a, b) => Date.parse(a!.publishedAt!) - Date.parse(b!.publishedAt!),
		);
		return copy;
	}, [videos]);

	return (
		<div
			className="relative w-full h-full px-10 py-5 overflow-x-auto bg-white rounded-3xl"
			style={{
				scrollbarWidth: "none",
			}}
		>
			<div className="absolute bottom-10">
				<div className="flex justify-around items-center bg-blue-400 rounded-lg w-full h-[5px]">
					{sorted.map((video, idx) => {
						const { id, thumbnailUrl, title, publishedAt, description } =
							video!;

						return (
							<div className="flex flex-col items-center w-[350px]" key={id}>
								<div className="bottom-[50px] absolute flex flex-col items-center gap-y-5">
									{/* {renderThumbnailImage(idx, thumbnailUrl!, title!)} */}
									<div className="flex flex-col gap-y-1 w-[300px] h-[200px]">
										<h2 className="text-lg font-bold">{title}</h2>
										<p className="text-sm font-thin">{publishedAt}</p>
										<h3 className="text-[14px]">상세 설명</h3>
										<p
											className="flex-1 px-2 py-1 overflow-y-auto text-sm bg-gray-100 rounded-md"
											style={{ scrollbarWidth: "none" }}
										>
											{description}
										</p>
									</div>
								</div>
								<span className="bg-white border border-blue-400 border-solid rounded-full w-[10px] h-[10px]"></span>
								<span className="absolute font-thin top-3 py-12text-sm text-nowrap">
									{formatPublishedAt(video!.publishedAt!)}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

const formatPublishedAt = (publishedAt: string) => {
	const date = new Date(publishedAt);
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

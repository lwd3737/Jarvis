import { YoutubeVideoDto } from "@/dto/youtube.dto";
import { formatDate } from "../utils";
import { useMemo } from "react";
import Image from "next/image";

interface Props extends YoutubeVideoDto {
	isStreaming: boolean;
}

export default function VideoInfoCard(props: Props) {
	const thumbnail = useMemo(() => {
		if (props.isStreaming) return null;

		return (
			<Image
				src={props.thumbnailUrl}
				alt={props.title}
				width={200}
				height={200}
			/>
		);
	}, [props.isStreaming, props.thumbnailUrl, props.title]);

	return (
		<div className="flex flex-col items-center w-[350px]" key={props.id}>
			<div className="flex flex-col items-center gap-y-5">
				{/* {renderThumbnailImage(idx, thumbnailUrl!, title!)} */}
				{thumbnail}
				<div className="flex flex-col gap-y-1 w-[300px] h-[200px]">
					<h2 className="text-lg font-bold">{props.title}</h2>
					<p className="text-sm font-thin">{props.publishedAt}</p>
					<h3 className="text-[14px]">상세 설명</h3>
					<p
						className="flex-1 px-2 py-1 overflow-y-auto text-sm bg-gray-100 rounded-md"
						style={{ scrollbarWidth: "none" }}
					>
						{props.description}
					</p>
				</div>
			</div>
			{/* <span className="bg-white border border-blue-400 border-solid rounded-full w-[10px] h-[10px]"></span> */}
		</div>
	);
}

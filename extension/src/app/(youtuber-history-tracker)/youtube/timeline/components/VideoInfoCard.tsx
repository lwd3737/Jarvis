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
				className="rounded-3xl"
				src={props.thumbnailUrl}
				alt={props.title}
				width={200}
				height={200}
			/>
		);
	}, [props.isStreaming, props.thumbnailUrl, props.title]);

	return (
		<div className="flex flex-col items-center w-[350px] h-full" key={props.id}>
			<div className="flex flex-col items-center gap-y-5">
				{thumbnail}
				<div className="flex flex-col gap-y-1 w-[300px]">
					<h2 className="h-[30px] font-bold text-ellipsis text-lg text-nowrap overflow-hidden">
						{props.title}
					</h2>
					<p className="text-sm font-thin">{props.publishedAt}</p>
					<h3 className="text-[14px]">상세 설명</h3>
					<p
						className="bg-gray-100 px-2 py-1 rounded-md h-[150px] text-sm overflow-y-auto"
						style={{ scrollbarWidth: "none" }}
					>
						{props.description}
					</p>
				</div>
			</div>
		</div>
	);
}

"use client";
import { youtubeVideosSchema } from "@/schema/youtube-videos";
import { useTimeLine } from "../../providers/TimeLineProvider";
import { ReactElement, useEffect, useRef, useState } from "react";
import Image from "next/image";
import createUseObject from "./object-creator";
import { useRouter } from "next/navigation";
import { start } from "repl";

const useObject = createUseObject();

export default function useGenerateTimeLine(options?: {
	thunmbnail: { width?: number; height?: number };
}) {
	const router = useRouter();

	const { object, submit, isLoading, stop } = useObject({
		api: "/api/youtube/timeline",
		schema: youtubeVideosSchema,
		onFinish(event) {
			const { error } = event;
			if (error) {
				console.error(error.message);
			}
		},
	});

	const { params } = useTimeLine();
	const [generated, setGenerated] = useState(false);

	useEffect(() => {
		if (!params) {
			router.push("/youtube/timeline");
			return;
		}
		if (generated) return;

		submit({
			...params,
			dateRange: {
				startDate: params.dateRange.startDate?.toISOString(),
				endDate: params.dateRange.endDate?.toISOString(),
			},
		});
		setGenerated(true);
	}, [params, generated, stop, submit, router]);

	useEffect(() => {
		return () => stop();
	}, [stop]);

	const streamingVideoIdx = object?.videos?.length
		? object.videos.length - 1
		: 0;
	const isVideoStreaming = (videoIdx: number) =>
		isLoading && videoIdx === streamingVideoIdx;

	const thumbnailImagesRef = useRef<ReactElement[]>([]);

	const renderThumbnailImage = (
		videoIdx: number,
		thumbnailUrl: string,
		alt: string,
	) => {
		if (isVideoStreaming(videoIdx)) return null;

		// thumbnail 이미지 request 최적화를 위한 로직
		const images = thumbnailImagesRef.current;

		const { width, height } = options?.thunmbnail ?? {};

		if (!images[videoIdx])
			images[videoIdx] = (
				<Image
					src={thumbnailUrl}
					width={width ?? 200}
					height={height ?? 200}
					alt={alt}
					onError={(e) => console.log(e)}
				/>
			);

		return images[videoIdx];
	};

	return {
		isLoading,
		videos: object?.videos ?? [],
		isVideoStreaming,
		renderThumbnailImage,
	};
}

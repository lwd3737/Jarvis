"use client";
import { youtubeVideosSchema } from "@/schema/youtube-videos";
import { experimental_useObject as useObject } from "ai/react";
import Image from "next/image";
import { useTimeLine } from "../providers/TimeLineProvider";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";

export default function Page() {
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

	const { args } = useTimeLine();

	useEffect(() => {
		submit(args);

		return () => stop();
	}, [args]);

	const currentVideoIdx = object?.videos?.length ?? 0;

	const thumbnailImagesRef = useRef<ReactElement[]>([]);

	return (
		<div>
			<ul>
				{object?.videos?.map((video, idx) => {
					const { id, title, description, thumbnailUrl, publishedAt } = video!;

					const isStreaming = idx === currentVideoIdx - 1;
					const images = thumbnailImagesRef.current;

					if (!isStreaming && thumbnailUrl) {
						if (!images[idx])
							images[idx] = (
								<Image
									src={thumbnailUrl}
									width={100}
									height={100}
									alt={title!}
									onError={(e) => console.log(e)}
								/>
							);
					}

					return (
						<li key={id}>
							{images[idx]}
							<h2>{title}</h2>
							<p>{description}</p>
							<p>{publishedAt}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

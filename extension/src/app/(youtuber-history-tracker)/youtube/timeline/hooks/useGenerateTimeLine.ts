import { useCallback, useEffect, useRef, useState } from "react";
import { useTimeLine } from "../../providers/TimeLineProvider";
import { useRouter } from "next/navigation";
import {
	GenerateTimeLineOutput,
	TimeLineMetadata,
	YoutubeVideoDto,
} from "@/dto/youtube.dto";
import { createMockVideos } from "../../mock/data";
import { generateTimeline } from "@/app/api/youtube/timeline/fetch";
import { FailureResult } from "@/app/api/youtube/result";

export default function useGenerateTimeLine() {
	const useMock = process.env.NEXT_PUBLIC_TIME_LINE_GENERATION_MOCK === "true";
	const router = useRouter();

	const { input } = useTimeLine();

	useEffect(
		function redirectToFormIfInputIsEmpty() {
			if (useMock) return;
			if (!input?.channel || !input.topicDescription)
				router.replace("/youtube");
		},
		[input?.channel, input?.topicDescription, router, useMock],
	);

	const isLoadingRef = useRef(false);
	const [isLoading, setIsLoading] = useState(false);
	const [metadata, setMetadata] = useState<TimeLineMetadata | null>(null);
	const [videos, setVideos] = useState<YoutubeVideoDto[]>([]);

	const prevVideosRef = useRef<YoutubeVideoDto[]>([]);

	const processStream = useCallback(async (stream: ReadableStream) => {
		const reader = stream.getReader();
		const decoder = new TextDecoder();

		let incompletedChunk: undefined | string = undefined;
		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				if (incompletedChunk) {
					const completedLastChunk = JSON.parse(
						incompletedChunk,
					) as GenerateTimeLineOutput;
					if ("metadata" in completedLastChunk)
						setMetadata(completedLastChunk.metadata);
					else if ("videos" in completedLastChunk)
						setVideos((prev) => [...prev, ...completedLastChunk.videos]);
				}

				return;
			}

			const decoded = decoder.decode(value, { stream: true });
			const chunks = decoded.split("\n");

			incompletedChunk = chunks.pop();

			chunks.forEach((chunk) => {
				const parsed = JSON.parse(chunk) as GenerateTimeLineOutput;

				if ("metadata" in parsed) {
					setMetadata(parsed.metadata);
				}
				if ("videos" in parsed) {
					setVideos([
						...prevVideosRef.current,
						...parsed.videos.filter(Boolean),
					]);
				}
			});
		}
	}, []);

	const abortControllerRef = useRef<AbortController | null>(null);

	const stop = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	}, []);

	const isStreaming = useCallback(
		(idx: number) => isLoading && idx === videos.length - 1,
		[isLoading, videos.length],
	);

	const generate = useCallback(
		async (nextPageToken?: string) => {
			if (isLoadingRef.current) return;

			isLoadingRef.current = true;
			setIsLoading(true);

			if (useMock) {
				setMetadata({ nextPageToken: "nextPageToken" });

				if (nextPageToken)
					setVideos((prev) => [...prev, ...createMockVideos()]);
				else setVideos(createMockVideos());

				isLoadingRef.current = false;
				setIsLoading(false);

				return;
			} else if (!input?.channel || !input.topicDescription) return;

			const controller = (abortControllerRef.current = new AbortController());

			try {
				const res = await generateTimeline(
					{
						channelId: input.channel.channelId,
						topicDescription: input.topicDescription,
						dateRange: {
							startDate: input.dateRange.startDate?.toISOString(),
							endDate: input.dateRange.endDate?.toISOString(),
						},
						nextPageToken,
					},
					{ signal: controller.signal },
				);

				if (!res.ok) {
					const { error } = (await res.json()) as FailureResult;
					console.error(error.message);

					isLoadingRef.current = false;
					setIsLoading(false);
					return;
				}

				const stream = res.body;
				if (!stream) {
					isLoadingRef.current = false;
					setIsLoading(false);

					abortControllerRef.current = null;
					return;
				}

				await processStream(stream);

				isLoadingRef.current = false;
				setIsLoading(false);

				abortControllerRef.current = null;
			} catch (err) {
				isLoadingRef.current = false;
				setIsLoading(false);

				abortControllerRef.current = null;

				const { name } = err as Error;
				if (name === "AbortError") {
					console.log("Streaming is aborted");
				}
			}
		},
		[input, processStream, useMock],
	);

	const generateMore = useCallback(async () => {
		if (!metadata?.nextPageToken) return;

		prevVideosRef.current = videos;
		generate(metadata.nextPageToken);
		prevVideosRef.current = [];
	}, [generate, metadata?.nextPageToken, videos]);

	return {
		metadata,
		videos,
		isLoading,
		isStreaming,
		stop,
		generate,
		generateMore,
	};
}

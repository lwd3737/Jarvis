import { useCallback, useEffect, useRef, useState } from "react";
import { useTimeLine } from "../../providers/TimeLineProvider";
import { useRouter } from "next/navigation";
import {
	GenerateTimeLineOutput,
	TimeLineMetadata,
	YoutubeVideoDto,
} from "@/dto/youtube.dto";
import { MOCK_VIDEOS } from "../../mock/data";

export default function useGenerateTimeLine() {
	const useMock = process.env.NEXT_PUBLIC_TIME_LINE_GENERATION_MOCK === "true";

	const router = useRouter();

	const { input } = useTimeLine();

	useEffect(
		function redirectToFormIfInputIsEmpty() {
			if (!input?.channel || !input.topicDescription)
				router.replace("/youtube");
		},
		[input?.channel, input?.topicDescription],
	);

	const [isLoading, setIsLoading] = useState(false);
	const [metadata, setMetadata] = useState<TimeLineMetadata | null>(null);
	const [videos, setVideos] = useState<YoutubeVideoDto[]>(
		useMock ? MOCK_VIDEOS : [],
	);

	const processStream = useCallback(async (stream: ReadableStream) => {
		const reader = stream.getReader();
		const decoder = new TextDecoder();

		let incompletedChunk: undefined | string = undefined;
		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				if (incompletedChunk) {
					console.log(JSON.parse(incompletedChunk));
				}

				break;
			}

			const decoded = decoder.decode(value, { stream: true });
			const chunks = decoded.split("\n");

			incompletedChunk = chunks.pop();

			chunks.forEach((json) => {
				const parsed = JSON.parse(json) as GenerateTimeLineOutput;

				if ("metadata" in parsed) {
					setMetadata(parsed.metadata);
				}
				if ("videos" in parsed) {
					setVideos(parsed.videos.filter(Boolean));
				}
			});
		}
	}, []);

	const abortControllerRef = useRef<AbortController | null>(null);

	const submit = useCallback(async () => {
		if (useMock) return;

		if (!input) {
			return;
		}

		const controller = (abortControllerRef.current = new AbortController());

		setIsLoading(true);

		try {
			const res = await fetch("/api/youtube/timeline", {
				method: "POST",
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
				},
				body: JSON.stringify({
					...input,
					dataRange: {
						startDate: input.dateRange.startDate?.toISOString(),
						endDate: input.dateRange.endDate?.toISOString(),
					},
				}),
				signal: controller.signal,
			});

			const stream = res.body;
			if (!stream) {
				setIsLoading(false);
				abortControllerRef.current = null;
				return;
			}

			await processStream(stream);

			setIsLoading(false);
			abortControllerRef.current = null;
		} catch (err) {
			setIsLoading(false);
			abortControllerRef.current = null;

			const { name } = err as Error;
			if (name === "AbortError") {
				console.log("Streaming is aborted");
			}
		}
	}, []);

	const stop = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	}, []);

	const isStreaming = (idx: number) => isLoading && idx === videos.length - 1;

	return {
		isLoading,
		metadata,
		videos,
		submit,
		stop,
		isStreaming,
	};
}

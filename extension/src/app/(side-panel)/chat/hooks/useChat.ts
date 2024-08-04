import { useCallback, useRef, useState } from "react";
import {
	CoreAssistantMessage,
	CoreMessage,
	CoreUserMessage,
	FinishReason,
} from "ai";
import { CHAT_EVENT } from "@/constants/events";
import useConfig from "../../../../hooks/useConfig";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import { chatApi } from "@/src/app/api/chat/fetch";

export default function useChat() {
	const config = useConfig();
	const guard = useAuthGuard();

	const [messages, setMessages] = useState<CoreMessage[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const eventSourceRef = useRef<EventSource | null>(null);

	const isStreamingStartedRef = useRef<boolean>(false);

	const handleTextChunk = useCallback((event: MessageEvent) => {
		const isStarted = isStreamingStartedRef.current;
		const chunk = event.data as string;

		if (!isStarted) {
			isStreamingStartedRef.current = true;

			setMessages((prev) => {
				const newMessage = {
					role: "assistant",
					content: chunk,
				} as CoreAssistantMessage;

				return [...prev, newMessage];
			});
		} else {
			setMessages((prev) =>
				prev.map((preMessage, idx, origin) => {
					const isStreaming = idx === origin.length - 1;
					if (!isStreaming) return preMessage;

					const streamingMessage = {
						role: "assistant",
						content: preMessage.content + chunk,
					} as CoreAssistantMessage;

					return streamingMessage;
				}),
			);
		}
	}, []);

	const onReplyFinished = useCallback(() => {
		isStreamingStartedRef.current = false;
		setLoading(false);

		const source = eventSourceRef.current;
		source?.close();
		eventSourceRef.current = null;
	}, []);

	const handleFinish = useCallback((event: MessageEvent) => {
		const { reason } = JSON.parse(event.data) as {
			reason: FinishReason | "completed";
		};
		switch (reason) {
			case "completed":
			case "stop":
			case "content-filter":
			case "tool-calls":
			case "other":
			case "length":
			case "unknown":
		}

		onReplyFinished();
	}, []);

	const handleError = useCallback((event: MessageEvent) => {
		console.error(event);

		onReplyFinished;
	}, []);

	const setUpReplyStream = useCallback(async () => {
		try {
			const eventSource = (eventSourceRef.current = new EventSource(
				`${config!.backendUrl}/api/chat/reply`,
			));
			// TODO: 공통 데이터 타입 공통 모듈에 정의
			eventSource.addEventListener(CHAT_EVENT.textChunk, handleTextChunk);
			eventSource.addEventListener(CHAT_EVENT.finish, handleFinish);
			eventSource.addEventListener(CHAT_EVENT.error, handleError);
		} catch (e) {
			console.error(e);
		}
	}, [config, onReplyFinished]);

	const chat = useCallback(
		async (content: string) => {
			if (loading) return;

			setLoading(true);

			const prompt = {
				role: "user",
				content,
			} as CoreUserMessage;

			setMessages((prev) => [...prev, prompt]);

			await guard(async () => {
				await chatApi.prompt(prompt);
				await setUpReplyStream();
			});
		},
		[guard, setUpReplyStream, loading],
	);

	const stop = useCallback(() => {
		eventSourceRef.current?.close();
		setLoading(false);
	}, []);

	return { messages, loading, append: chat, stop };
}

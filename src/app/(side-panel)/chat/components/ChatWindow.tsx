"use client";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import useChat from "../hooks/useChat";

export type MessageAppendHelper = (content: string) => void;
export type MessageStopHelper = () => void;

export default function ChatWindow() {
	const chat = useChat();

	return (
		<div className="flex flex-col h-full">
			<MessageList messages={chat.messages} />
			<MessageForm
				isLoading={chat.loading}
				append={chat.append}
				stop={chat.stop}
			/>
		</div>
	);
}

import { memo, useEffect, useMemo, useRef } from "react";
import MessageItem from "./MessageItem";
import { CoreMessage } from "ai";

type MessageListProps = {
	messages: CoreMessage[];
};

const MessageList = memo((props: MessageListProps) => {
	const scrollableRef = useRef<HTMLUListElement>(null);

	useEffect(
		function scrollToBottomOnScrollPositionedAtBottom() {
			const scrollableEl = scrollableRef.current;
			if (!scrollableEl) return;

			const isScrollPositionedAtBottom =
				Math.abs(
					scrollableEl.scrollHeight -
						scrollableEl.scrollTop -
						scrollableEl.clientHeight,
				) < 100;
			if (!isScrollPositionedAtBottom) return;

			scrollableEl.scrollTop = scrollableEl.scrollHeight;
		},
		[props.messages],
	);

	const messages = useMemo(
		() =>
			props.messages.map((message, i) => (
				<MessageItem key={i} message={message} />
			)),
		[props.messages],
	);

	return (
		<ul
			ref={scrollableRef}
			className="flex-grow h-full overflow-y-auto border border-gray-100 border-solid"
		>
			{messages}
		</ul>
	);
});

MessageList.displayName = MessageList.name;

export default MessageList;

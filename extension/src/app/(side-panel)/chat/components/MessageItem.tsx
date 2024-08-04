import { CoreMessage } from "ai";

interface MessageProps {
	message: CoreMessage;
}

export default function MessageItem(props: MessageProps) {
	return (
		<li className="flex items-start p-5 whitespace-pre-wrap border-b border-gray-100 border-solid gap-x-3">
			<div className="leading-[1.2] text-[13px] font-bold">
				{formatRole(props.message.role)}
			</div>
			<div className="text-[15px]">{parseContent(props.message.content)}</div>
		</li>
	);
}

const formatRole = (role: string) => {
	return role[0].toUpperCase() + role.slice(1);
};

const parseContent = (content: CoreMessage["content"]): string => {
	if (Array.isArray(content)) {
		const textContent = content
			.filter((part) => part.type === "text")
			.join("\n");
		return textContent;
	}
	return content ?? "";
};

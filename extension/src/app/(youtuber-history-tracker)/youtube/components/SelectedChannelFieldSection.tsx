import Image from "next/image";
import FormFieldSection from "./FormFieldSection";
import { YoutubeChannelDto } from "@/dto/youtube.dto";

interface Props {
	channel: YoutubeChannelDto;
	onCancel: () => void;
}

export default function SelectedChannelFieldSection({
	channel,
	onCancel,
}: Props) {
	return (
		<FormFieldSection
			title="선택된 채널"
			headRight={
				<button className="text-[12px] text-red-500" onClick={onCancel}>
					취소
				</button>
			}
			field={
				<>
					<Image
						src={channel.thumbnailUrl!}
						width={80}
						height={80}
						alt={channel.channelTitle}
					/>
					<div className="flex flex-col py-2 gap-y-2">
						<h2 className="font-semibold text-[14px]">
							{channel.channelTitle}
						</h2>
						<p className="font-thin text-[12px]">{channel.description}</p>
					</div>
				</>
			}
		/>
	);
}

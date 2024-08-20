import { ChannelDto } from "@/app/api/youtube/channel/dto";
import Image from "next/image";
import FormFieldSection from "./FormFieldSection";

interface Props {
	channel: ChannelDto;
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
			fields={
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

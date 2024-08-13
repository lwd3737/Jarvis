import { ChannelDto } from "@/app/api/youtube/channel/dto";
import Image from "next/image";

interface Props {
	channel: ChannelDto;
	onCancel: () => void;
}

export default function SelectedChannelSection({ channel, onCancel }: Props) {
	return (
		<section>
			<div className="flex justify-between">
				<h1 className="text-lg font-bold">선택된 채널</h1>
				<button className="text-[12px] text-red-500" onClick={onCancel}>
					취소
				</button>
			</div>
			<hr />
			<div className="flex py-2 gap-x-3">
				<Image
					src={channel.thumbnailUrl!}
					width={80}
					height={80}
					alt={channel.channelTitle}
				/>
				<div className="flex flex-col py-2 gap-y-2">
					<h2 className="font-semibold text-[14px]">{channel.channelTitle}</h2>
					<p className="font-thin text-[12px]">{channel.description}</p>
				</div>
			</div>
		</section>
	);
}

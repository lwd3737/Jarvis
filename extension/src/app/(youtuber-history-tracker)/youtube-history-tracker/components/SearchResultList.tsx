import { ChannelDto } from "@/app/api/youtube/channel/dto";
import Image from "next/image";

interface Props {
	channels: ChannelDto[];
}

export default function SearchResultList(props: Props) {
	return (
		<ul className="flex flex-col h-full py-2 gap-y-3">
			{props.channels.map((channel) => {
				return (
					<li
						className="flex flex-col items-center border-b border-gray-200 border-solid"
						key={channel.channelId}
					>
						<Image
							src={channel.thumbnailUrl!}
							width={150}
							height={100}
							alt={channel.channelTitle}
						/>
						<div className="flex flex-col px-4 py-2 gap-y-2">
							<h2 className="w-full font-bold">{channel.channelTitle}</h2>
							<p className="text-[12px]">{channel.description}</p>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

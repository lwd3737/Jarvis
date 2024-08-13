"use client";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Props {
	channels: ChannelDto[];
	onClose: () => void;
}

export default function SearchResultList({ channels, onClose }: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClose = (ev: MouseEvent) => {
			const containerEl = containerRef.current;
			if (!containerEl) return;

			const targetEl = ev.target as HTMLElement;

			if (!containerEl.contains(targetEl)) onClose();
		};

		document.addEventListener("click", handleClose);

		return () => document.removeEventListener("click", handleClose);
	}, [onClose]);

	return (
		<div className="relative w-full" ref={containerRef}>
			<ul className="absolute left-0 right-0 flex flex-col border border-gray-200 border-solid rounded-lg">
				{channels.map((channel) => {
					return (
						<li
							className="flex items-center p-2 border-b border-gray-200 border-solid last:border-b-0"
							key={channel.channelId}
						>
							<Image
								src={channel.thumbnailUrl!}
								width={50}
								height={50}
								alt={channel.channelTitle}
							/>
							<div className="flex flex-col px-4 py-2 gap-y-2">
								<h2 className="w-full font-bold text-[13px]">
									{channel.channelTitle}
								</h2>
								<p className="text-[12px]">{channel.description}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

"use client";
import React from "react";
import ChannelSearch from "./ChannelSearch";

export default function SidePannel() {
	return (
		<aside className="border-r border-r-gray-200 border-solid w-[20%] h-full">
			<ChannelSearch />
		</aside>
	);
}

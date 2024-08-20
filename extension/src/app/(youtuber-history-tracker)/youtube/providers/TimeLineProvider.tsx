"use client";
import { ChannelDto } from "@/app/api/youtube/channel/dto";
import { createContext, useContext, useMemo, useState } from "react";

export const TimeLineContext = createContext<
	ReturnType<typeof useTimeLineApi> | undefined
>(undefined);

export default function TimeLineProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const api = useTimeLineApi();
	return (
		<TimeLineContext.Provider value={api}>{children}</TimeLineContext.Provider>
	);
}

const useTimeLineApi = () => {
	const [args, setArgs] = useState<{
		keywords: string[];
		channel: ChannelDto;
	} | null>(null);

	const api = useMemo(
		() => ({
			args,
			setArgs,
		}),
		[args],
	);

	return api;
};

export const useTimeLine = () => {
	const api = useContext(TimeLineContext);

	if (!api) {
		throw new Error("useTimeLine must be used within TimeLineProvider");
	}

	return api;
};

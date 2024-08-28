"use client";
import { YoutubeChannelDto } from "@/dto/youtube.dto";
import { createContext, useContext, useMemo, useState } from "react";
import { MOCK_TIME_LINE_ARGS } from "../mock/data";

export const TimeLineContext = createContext<
	ReturnType<typeof useTimeLineApi> | undefined
>(undefined);

export default function TimeLineProvider({
	config,
	children,
}: {
	config?: { mock: boolean };
	children: React.ReactNode;
}) {
	const api = useTimeLineApi(config?.mock ? MOCK_TIME_LINE_ARGS : null);
	return (
		<TimeLineContext.Provider value={api}>{children}</TimeLineContext.Provider>
	);
}

const useTimeLineApi = (
	initial?: {
		keywords: string[];
		channel: YoutubeChannelDto;
	} | null,
) => {
	const [args, setArgs] = useState<{
		keywords: string[];
		channel: YoutubeChannelDto;
	} | null>(initial ?? null);

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

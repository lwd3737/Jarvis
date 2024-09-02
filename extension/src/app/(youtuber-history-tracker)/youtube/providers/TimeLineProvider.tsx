"use client";
import { YoutubeChannelDto } from "@/dto/youtube.dto";
import { createContext, useContext, useMemo, useState } from "react";
import { MOCK_TIME_LINE_ARGS } from "../mock/data";

export const TimeLineContext = createContext<
	ReturnType<typeof useTimeLineApi> | undefined
>(undefined);

interface Params {
	channel: YoutubeChannelDto;
	keywords: string[];
	dateRange: { startDate: Date | undefined; endDate: Date | undefined };
}

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

const useTimeLineApi = (initial?: Params | null) => {
	const [params, setParams] = useState<Params | null>(initial ?? null);

	const api = useMemo(
		() => ({
			params,
			setParams,
		}),
		[params],
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

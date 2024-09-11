"use client";
import { YoutubeChannelDto } from "@/dto/youtube.dto";
import { createContext, useContext, useMemo, useState } from "react";
import { MOCK_TIME_LINE_ARGS } from "../mock/data";

export const TimeLineContext = createContext<
	ReturnType<typeof useTimeLineApi> | undefined
>(undefined);

interface Input {
	channel?: YoutubeChannelDto;
	topicDescription?: string;
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

const useTimeLineApi = (initial?: Input | null) => {
	const [input, setInput] = useState<Input | null>(initial ?? null);

	const api = useMemo(
		() => ({
			input,
			setInput,
		}),
		[input],
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

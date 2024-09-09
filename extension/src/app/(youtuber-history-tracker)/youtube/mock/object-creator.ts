import { YoutubeVideos } from "@/schema/youtube-videos";
import { experimental_useObject as useObject } from "ai/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MOCK_VIDEOS } from "./data";
import new__useGenerateTimeLine from "../timeline/hooks/useGenerateTimeLine.new";
import { metadata } from "@/app/(side-panel)/layout";

export default function createUseObject(): typeof new__useGenerateTimeLine {
	const mock = process.env.NEXT_PUBLIC_TIME_LINE_GENERATION_MOCK === "true";
	return mock ? useMockObject : new__useGenerateTimeLine;
}

const useMockObject = (): any => {
	const [videos, setVideos] = useState<YoutubeVideos>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [generated, setGenerated] = useState(false);

	const stoppedRef = useRef(false);

	useEffect(() => {
		if (generated) return;

		(async () => {
			setIsLoading(true);
			for (const video of MOCK_VIDEOS) {
				if (stoppedRef.current) return;

				await new Promise((resolve) => setTimeout(resolve, 1000));
				setVideos((prev) => [...prev, video]);
			}

			setIsLoading(false);
		})();

		setGenerated(true);

		return () => {
			stoppedRef.current = false;
		};
	}, [generated, isLoading]);

	const object = useMemo(() => ({ videos }), [videos]);

	const submit = useCallback((args: any) => {}, []);

	const stop = useCallback(() => {
		stoppedRef.current = true;
	}, []);

	return {
		isLoading: false,
		videos,
		metadata: null,
		submit,
		stop,
	};
};

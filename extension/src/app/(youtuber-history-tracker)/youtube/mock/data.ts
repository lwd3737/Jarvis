import { YoutubeVideos } from "@/schema/youtube-videos";
import { TimeLineInput } from "../providers/TimeLineProvider";

let _videoid = 0;

export const createMockVideos = (): YoutubeVideos => {
	return Array.from({ length: 10 }).map(() => {
		return {
			id: `videoId${_videoid++}`,
			publishedAt: new Date().toISOString(),
			title: `videoTitle${_videoid}`,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget velit urna. Nullam convallis augue eu felis viverra efficitur. Suspendisse pellentesque dui in semper elementum. Pellentesque nec suscipit ex, a congue odio. Vivamus porttitor urna quis nunc gravida ultrices. Aenean maximus lacinia lacus, sit amet cursus ante. Praesent placerat magna id lectus pharetra, pulvinar vulputate justo elementum. Suspendisse eu neque at neque accumsan viverra. Morbi eu nunc porta, pellentesque sem ac, tristique lorem. Pellentesque rhoncus ligula ut purus efficitur, vitae ullamcorper mauris faucibus. Duis rhoncus sollicitudin mattis. Nulla et eros porta, viverra arcu at, egestas velit.",
			thumbnailUrl: "https://picsum.photos/200",
		};
	});
};

export const MOCK_TIME_LINE_INPUT: TimeLineInput = {
	channel: {
		channelId: "test",
		channelTitle: "test",
		description: "test",
		thumbnailUrl: "test",
	},
	topicDescription: "test desc...",
	dateRange: {
		startDate: undefined,
		endDate: undefined,
	},
};

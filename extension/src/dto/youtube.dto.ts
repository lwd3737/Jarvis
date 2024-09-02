export interface YoutubeChannelDto {
	channelId: string;
	channelTitle: string;
	description: string;
	thumbnailUrl: string;
}

export interface YoutubeVideoDto {
	id: string;
	publishedAt: string;
	title: string;
	description: string;
	thumbnailUrl: string;
}

export interface GenerateTimeLineInput {
	channelId: string;
	keywords: string[];
	dateRange: { startDate: string | undefined; endDate: string | undefined };
}

export interface GenerateTimeLineOutput {
	videos: YoutubeVideoDto[];
}

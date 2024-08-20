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
}

export interface GenerateTimeLineOutput {
	videos: YoutubeVideoDto[];
}

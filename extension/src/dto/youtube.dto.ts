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
	topicDescription: string;
	dateRange: { startDate: string | undefined; endDate: string | undefined };
	nextPageToken?: string;
}

export type GenerateTimeLineOutput =
	| {
			metadata: TimeLineMetadata;
	  }
	| {
			videos: YoutubeVideoDto[];
	  };

export interface TimeLineMetadata {
	nextPageToken: string;
}

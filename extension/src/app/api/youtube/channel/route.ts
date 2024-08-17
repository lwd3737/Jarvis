import { google } from "googleapis";
import { type NextRequest } from "next/server";
import { createErrorResponse, createResponse } from "../result";

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get("query");
	if (!query) return createErrorResponse("Query is required", 400);

	const youtube = google.youtube({
		version: "v3",
		auth: process.env.GOOGLE_API_KEY,
	});

	const result = await youtube.search.list({
		part: ["snippet"],
		type: ["channel"],
		q: query,
	});

	if (result.status >= 400)
		return createErrorResponse(result.statusText, result.status);

	const { items } = result.data;
	if (!items) return createErrorResponse("Search data is empty", 404);

	const dto = items.map((item) => {
		const { channelId, channelTitle, description, thumbnails } = item.snippet!;
		return {
			channelId: channelId!,
			channelTitle: channelTitle!,
			description,
			thumbnailUrl: thumbnails?.default?.url,
		};
	});

	return createResponse({ channels: dto });
}

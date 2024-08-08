import { json } from "@/utils/fetch";
import { CoreUserMessage } from "ai";
import { fetchWithAuthToken } from "../fetch-with-auth-token";

export async function prompt(body: CoreUserMessage): Promise<Response> {
	return fetchWithAuthToken("chat/prompt", {
		method: "POST",
		body: json(body),
	});
}

export const chatApi = {
	prompt,
};

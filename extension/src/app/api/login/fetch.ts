import { json } from "@/src/utils/fetch";
import { baseFetch } from "../base-fetch";

export async function login(credentials: {
	email: string;
	password: string;
}): Promise<{ accessToken: string }> {
	const res = await baseFetch("auth/login", {
		method: "POST",
		body: json(credentials),
	});

	if (!res.ok) {
		throw new Error(res.statusText);
	}
	return res.json();
}

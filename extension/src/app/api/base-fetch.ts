import { getConfig } from "@/services";

export const baseFetch = async (
	...args: Parameters<typeof fetch>
): Promise<Response> => {
	const [input, init] = args;

	const { backendUrl } = getConfig();
	const url =
		input instanceof URL
			? input.toString()
			: input instanceof globalThis.Request
				? input.url
				: `${backendUrl}/api/${input}`;

	return fetch(url, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...init?.headers,
		},
	});
};

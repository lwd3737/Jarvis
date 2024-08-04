import { getStorageService } from "@/src/services/storage/storage.service";
import { baseFetch } from "./base-fetch";
import { UnauthorizedException } from "@/src/exceptions/unauthorize.exception";

export const fetchWithAuthToken = async (
	...args: Parameters<typeof fetch>
): Promise<Response> => {
	const [input, init] = args;
	const storageService = getStorageService();

	const accessToken = (await storageService.get("accessToken")) as string;
	if (!accessToken)
		throw new UnauthorizedException("Access token is not found from storage");

	const res = await baseFetch(input, {
		...init,
		headers: {
			...init?.headers,
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (res.status === 401) {
		throw new UnauthorizedException();
	}

	return res;
};

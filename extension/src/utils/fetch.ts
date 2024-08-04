export function serializeBody(body: any): string {
	return JSON.stringify(body);
}

export const json = serializeBody;

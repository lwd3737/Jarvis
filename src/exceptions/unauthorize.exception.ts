export class UnauthorizedException extends Error {
	constructor(message?: string) {
		super(`[Unauthorized]${message ?? ""}`);
	}
}

import { ConfigService } from "./config.service";
import { DIContainer } from "./di-container";
import StorageService from "./storage/storage.service";

export async function bind() {
	console.info(`[DIContainer]Binding services for ${getRuntime()} runtime`);

	const container = new DIContainer();

	container.bind(ConfigService, {
		backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
	});

	container.bind(StorageService);

	globalThis.__container = container;
}

export function unbind() {
	console.info(`[DIContainer]Unbinding services for ${getRuntime()} runtime`);
	globalThis.__container = null;
}

function getRuntime() {
	if (typeof window !== "undefined") {
		return "browser";
	} else if (typeof global !== "undefined") {
		return "node";
	} else {
		return "unknown";
	}
}

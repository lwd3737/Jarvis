import { Config } from ".";
import { ConfigService } from "./config.service";
import { DIContainer } from "./di-container";

export function getContainer() {
	const container = globalThis.__container as DIContainer;
	if (!container) {
		throw new Error("DIContainer not created");
	}

	return container;
}

export function getConfig(): Config {
	const container = getContainer();
	const configService = container.get<ConfigService<Config>>(ConfigService);
	return configService.get();
}

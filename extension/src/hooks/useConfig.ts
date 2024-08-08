import { Config, ConfigService } from "@/services";
import { useContainer } from "./useContainer";

export default function useConfig(): Config | null {
	const container = useContainer();
	const configService = container?.get<ConfigService<Config>>(ConfigService);
	return configService?.get() ?? null;
}

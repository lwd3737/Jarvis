import { deepFreeze } from "../utils/immutable";
import { IService } from "./service";

type Config = Record<string, any>;

export class ConfigService<T extends Config> implements IService {
	constructor(private config: T) {}

	private validate(config: T) {
		const values = Object.values(config);
		if (values.length === 0) this.throwInvalidValueError(values);

		values.forEach((value) => {
			if (value === undefined || value === null)
				this.throwInvalidValueError(value);

			if (Array.isArray(value)) {
				if (value.length === 0) this.throwInvalidValueError(value);
			}

			if (typeof value === "object") {
				this.validate(config);
			}
		});
	}

	private throwInvalidValueError(value: any): void {
		throw new Error(`[${ConfigService.name}] ${value} is not set`);
	}

	public get(): T {
		return deepFreeze(this.config) as T;
	}
}

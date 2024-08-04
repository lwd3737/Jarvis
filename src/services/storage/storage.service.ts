import { getContainer } from "../helpers";
import { IService } from "../service";
import IStorageService from "./IStorage.service";
import ChromeStorageService from "./chrome-storage.service";
import LocalStorageService from "./local-storage.service";

export default class StorageService implements IService, IStorageService {
	private storage: LocalStorageService | ChromeStorageService;

	constructor() {
		if (chrome?.storage) {
			this.storage = new ChromeStorageService();
		} else {
			this.storage = new LocalStorageService();
		}
	}

	public async get<T = any>(key: string): Promise<T | null> {
		return this.storage.get(key);
	}

	public async set(key: string, value: any): Promise<void> {
		return this.storage.set(key, value);
	}

	public async clear(): Promise<void> {
		return this.storage.clear();
	}
}

export function getStorageService(): StorageService {
	const container = getContainer();
	return container.get<StorageService>(StorageService);
}

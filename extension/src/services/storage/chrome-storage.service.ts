import IStorageService from "./IStorage.service";

export default class ChromeStorageService implements IStorageService {
	private storage: typeof chrome.storage;

	constructor() {
		this.storage = chrome.storage;
	}

	public async get<T = any>(key: string): Promise<T | null> {
		const result = await this.storage.local.get(key);
		return (result[key] as T) ?? null;
	}

	public async set(key: string, value: any): Promise<void> {
		this.storage.local.set({ [key]: value });
	}

	public async clear(): Promise<void> {
		this.storage.local.clear();
	}
}

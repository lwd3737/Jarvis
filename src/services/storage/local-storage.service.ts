import IStorageService from "./IStorage.service";

export default class LocalStorageService implements IStorageService {
	private storage: Storage;

	constructor() {
		this.storage = window.localStorage;
	}

	public async get<T = any>(key: string): Promise<T | null> {
		const value = this.storage.getItem(key);
		return value ? JSON.parse(value) : null;
	}

	public async set(key: string, value: any): Promise<void> {
		this.storage.setItem(key, JSON.stringify(value));
	}

	public async clear(): Promise<void> {
		this.storage.clear();
	}
}

export default interface IStorageService {
	get<T = any>(key: string): Promise<T | null>;
	set(key: string, value: any): Promise<void>;
	clear(): Promise<void>;
}

import StorageService from "@/src/services/storage/storage.service";
import { useContainer } from "./useContainer";

export default function useStorage(): StorageService | null {
	const container = useContainer();
	const storageService = container?.get<StorageService>(StorageService);
	return storageService ?? null;
}

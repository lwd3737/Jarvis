import { DIContainer } from "../services/di-container";

declare global {
	var __container: DIContainer | null;
}

export {};

import { useContext } from "react";
import { DIContainer } from "@/src/services";
import { ContainerContext } from "../app/(side-panel)/components/ContainerProvider";

export function useContainer(): DIContainer | null {
	return useContext(ContainerContext);
}

import { useContext } from "react";
import { DIContainer } from "@/services";
import { ContainerContext } from "../app/(side-panel)/components/ContainerProvider";

export function useContainer(): DIContainer | null {
	return useContext(ContainerContext);
}

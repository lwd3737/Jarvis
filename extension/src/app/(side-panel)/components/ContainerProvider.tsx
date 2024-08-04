"use client";
import { DIContainer, bind, unbind } from "@/src/services";
import { createContext, useEffect, useState } from "react";

export const ContainerContext = createContext<DIContainer | null>(null);

export default function ContainerProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [container, setContainer] = useState<DIContainer | null>(null);

	useEffect(() => {
		bind().then(() => {
			const container = globalThis.__container;
			if (!container) {
				throw new Error("Container is not created");
			}

			setContainer(globalThis.__container);
		});

		return () => {
			unbind();
		};
	}, []);

	return (
		<ContainerContext.Provider value={container}>
			{children}
		</ContainerContext.Provider>
	);
}

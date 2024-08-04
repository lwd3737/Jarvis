"use client";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useStorage from "../../../hooks/useStorage";

export const AuthContext = createContext<{
	loading: boolean;
	isLogined: boolean;
	login: () => void;
	logout: () => void;
} | null>(null);

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const storage = useStorage();

	const [loading, setLoading] = useState<boolean>(false);
	const [isLogined, setIsLogined] = useState<boolean>(false);

	useEffect(
		function onAuthenticate() {
			setLoading(true);

			storage
				?.get<string>("accessToken")
				.then((accessToken) => {
					if (!accessToken) {
						setIsLogined(false);
					} else {
						setIsLogined(true);
					}
				})
				.then(() => {
					setLoading(false);
				});
		},
		[router, storage],
	);

	const login = useCallback(() => {
		setIsLogined(true);
	}, []);

	const logout = useCallback(() => {
		setIsLogined(false);
		storage?.clear();
	}, [storage]);

	useEffect(
		function onAuthenticated() {
			if (loading) return;

			if (!isLogined) {
				router.replace("/login");
			} else {
				router.replace("/");
			}
		},
		[isLogined, loading, router],
	);

	return (
		<AuthContext.Provider value={{ loading, isLogined, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

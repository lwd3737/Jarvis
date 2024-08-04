"use client";

import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./components/LoadingSpinner";

export default function SidePanelPage() {
	const router = useRouter();
	const auth = useAuth();

	useEffect(() => {
		if (!auth?.loading && auth?.isLogined) {
			router.replace("/chat");
		}
	}, [auth, router]);

	return (
		<div className="flex justify-center items-center h-full">
			<LoadingSpinner />
		</div>
	);
}

"use client";
import "@/styles/content.css";
import render from "@/scripts/content-scripts/render";
import { useEffect } from "react";
import LoadingSpinner from "../../(side-panel)/components/LoadingSpinner";

export default function TestPage() {
	useEffect(() => {
		render();

		return () => {
			const sidePanelOpenBtn = document.getElementById("sidepanel-open-btn");
			sidePanelOpenBtn?.remove();
		};
	}, []);

	return (
		<div>
			<h1 className="p-10 font-bold text-center text-lg">Test Page</h1>
			<LoadingSpinner />
		</div>
	);
}

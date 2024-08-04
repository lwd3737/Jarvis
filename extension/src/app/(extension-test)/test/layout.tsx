import type { Metadata } from "next";
import "@/src/app/global.css";

export const metadata: Metadata = {
	title: "Jarvis Test",
};

export default function ContentScriptsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className="h-full" lang="en">
			<body className="h-full">
				<main>{children}</main>
			</body>
		</html>
	);
}

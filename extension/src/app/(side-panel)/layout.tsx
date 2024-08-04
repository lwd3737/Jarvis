import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ContainerProvider from "./components/ContainerProvider";
import AuthProvider from "./components/AuthProvider";
import Header from "./components/Header";
import "../global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jarvis",
};

export default function SidePannelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className="h-full" lang="en">
			<body className={`h-full ${inter.className}`}>
				<ContainerProvider>
					<AuthProvider>
						<Header height="10%" />
						<main className="h-[90%]">{children}</main>
					</AuthProvider>
				</ContainerProvider>
			</body>
		</html>
	);
}

import "@/app/global.css";
import TimeLineProvider from "./providers/TimeLineProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html className="h-full">
			<body className="h-full">
				<header className="h-[50px]">
					<h1 className="p-3 text-xl italic font-bold text-gray-500">
						History Tracker
					</h1>
				</header>
				<main className="px-5 py-2 h-[calc(100%-50px)]">
					<TimeLineProvider>{children}</TimeLineProvider>
				</main>
			</body>
		</html>
	);
}

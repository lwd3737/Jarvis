import "@/app/global.css";
import TimeLineProvider from "./providers/TimeLineProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html className="h-full">
			<body className="h-full bg-gray-100">
				<header className="h-[50px]">
					<h1 className="p-3 text-xl italic font-bold text-gray-500">
						History Tracker
					</h1>
				</header>
				<main className="px-6 pt-3 pb-8 h-[calc(100%-50px)]">
					<TimeLineProvider
						config={{ mock: process.env.TIME_LINE_GENERATION_MOCK === "true" }}
					>
						{children}
					</TimeLineProvider>
				</main>
			</body>
		</html>
	);
}

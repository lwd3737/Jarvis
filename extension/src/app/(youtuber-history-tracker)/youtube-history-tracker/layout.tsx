import "@/app/global.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html className="h-full">
			<body className="h-full">
				<header>
					<h1 className="p-3 text-xl italic font-bold text-gray-500">
						History Tracker
					</h1>
				</header>
				<main className="h-full px-5 py-2">{children}</main>
			</body>
		</html>
	);
}

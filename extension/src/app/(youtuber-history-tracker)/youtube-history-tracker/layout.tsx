import "@/app/global.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html className="h-full">
			<body className="h-full">
				<main className="h-full">{children}</main>
			</body>
		</html>
	);
}

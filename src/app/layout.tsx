import type { Metadata } from "next";
import "ress";
import "./globals.css";
export const metadata: Metadata = {
	title: {
		default: "React",
		template: "%s | React",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}

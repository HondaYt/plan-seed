import type { Metadata } from "next";
import "../globals.css";
import "ress";
export const metadata: Metadata = {
	title: {
		default: "PlanSeed",
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

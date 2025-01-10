import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "デモ01",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

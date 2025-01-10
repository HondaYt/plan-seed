import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "マインドマップ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

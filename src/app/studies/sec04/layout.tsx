import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Section03",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

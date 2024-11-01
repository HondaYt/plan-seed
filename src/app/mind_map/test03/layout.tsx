import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Test02",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Section01",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

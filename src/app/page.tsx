import Link from "next/link";
import styles from "./app.module.scss";
import type { ReactNode } from "react";

export default function Home() {
	const categories = [
		{
			title: "📚 勉強",
			links: [
				{
					href: "sec01",
					title: "section01",
					description: "react Introduction",
				},
			],
		},
		{
			title: "🚀 test",
			links: [
				{
					href: "test01",
					title: "test01",
					description: "マインドマップぽいもの",
				},
			],
		},
	];

	return (
		<main>
			<CardCategoryWrapper>
				{categories.map((category) => (
					<CardCategory key={category.title} title={category.title}>
						{category.links.map((link) => (
							<LinkCard
								key={link.href}
								href={link.href}
								title={link.title}
								description={link.description}
							/>
						))}
					</CardCategory>
				))}
			</CardCategoryWrapper>
		</main>
	);
}

type linkCardProps = {
	href: string;
	title: string;
	description?: string;
};
function LinkCard(props: linkCardProps) {
	return (
		<Link href={props.href}>
			<div className={styles.linkCard}>
				<h3 className={styles.linkCardTitle}>{props.title}</h3>
				<p className={styles.linkCardDescription}>{props.description}</p>
			</div>
		</Link>
	);
}

type cardCategoryProps = {
	title: string;
	children: ReactNode; // childrenプロパティを追加
};

function CardCategory(props: cardCategoryProps) {
	return (
		<div className={styles.cardCategory}>
			<h2 className={styles.cardCategoryTitle}>{props.title}</h2>
			<div className={styles.cardCategoryChildren}>{props.children}</div>
		</div>
	);
}
type cardCategoryWrapperProps = {
	children: ReactNode;
};
function CardCategoryWrapper(props: cardCategoryWrapperProps) {
	return <div className={styles.cardCategoryWrapper}>{props.children}</div>;
}

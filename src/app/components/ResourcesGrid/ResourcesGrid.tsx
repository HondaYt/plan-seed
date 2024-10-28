import Link from "next/link";
import styles from "./styles.module.scss";
import type { ReactNode } from "react";

type ResourcesGridProps = {
	resources: {
		title: string;
		href: string;
		links: {
			href: string;
			title: string;
			description?: string;
		}[];
	}[];
};
export function ResourcesGrid(props: ResourcesGridProps) {
	return (
		<div className={styles.resourcesGrid}>
			{props.resources.map((category) => (
				<ResourceGroup key={category.title} title={category.title}>
					{category.links.map((link) => (
						<ResourceCard
							key={link.href}
							href={`${category.href}/${link.href}`}
							title={link.title}
							description={link.description}
						/>
					))}
				</ResourceGroup>
			))}
		</div>
	);
}

type ResourceGroupProps = {
	title: string;
	children: ReactNode;
};
function ResourceGroup(props: ResourceGroupProps) {
	return (
		<div className={styles.resourceGroup}>
			<h2 className={styles.resourceGroup__title}>{props.title}</h2>
			<div className={styles.resourceGroup__content}>{props.children}</div>
		</div>
	);
}

type ResourceCardProps = {
	href: string;
	title: string;
	description?: string;
};
function ResourceCard(props: ResourceCardProps) {
	const { href, title, description } = props;
	return (
		<Link href={`/${href}`}>
			<div className={styles.resourceCard}>
				<h3 className={styles.resourceCard__title}>{title}</h3>
				<p className={styles.resourceCard__description}>{description}</p>
			</div>
		</Link>
	);
}

import Link from "next/link";
import styles from "./styles.module.scss";
import type { ReactNode } from "react";
import type { Resource } from "@/app/types/resources";

type ResourcesGridProps = {
	resources: Resource[];
};

export function ResourcesGrid(props: ResourcesGridProps) {
	const { resources } = props;

	return (
		<div className={styles.resourcesGrid}>
			{resources.map((category) => (
				<ResourceGroup key={category.title} title={category.title}>
					{category.links.map((link) => (
						<ResourceCard
							key={link.href}
							href={`${category.href}/${link.href}`}
							title={link.title || ""}
							description={link.description}
							date={link.date || ""}
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
	const { title, children } = props;
	return (
		<div className={styles.resourceGroup}>
			<h2 className={styles.resourceGroup__title}>{title}</h2>
			<div className={styles.resourceGroup__content}>{children}</div>
		</div>
	);
}

type ResourceCardProps = {
	href: string;
	title: string;
	description?: string;
	date: string;
};

function ResourceCard(props: ResourceCardProps) {
	const { href, title, description, date } = props;
	return (
		<Link href={`/${href}`}>
			<article className={styles.resourceCard}>
				<p className={styles.resourceCard__date}>{date}</p>
				<h3 className={styles.resourceCard__title}>{title}</h3>
				<p className={styles.resourceCard__description}>{description}</p>
			</article>
		</Link>
	);
}

export type ResourceLink = {
	href: string;
	title: string;
	description?: string;
	date?: string;
};

export type Resource = {
	title: string;
	href: string;
	links: ResourceLink[];
};

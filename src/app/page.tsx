import { ResourcesGrid } from "@/app/components/ResourcesGrid/ResourcesGrid";
import { resources } from "@/app/data/resources";

export default function Home() {
	return (
		<main>
			<ResourcesGrid resources={resources} />
		</main>
	);
}

import { ResourcesGrid } from "@/app/components/ResourcesGrid/ResourcesGrid";
import { resources } from "@/app/data/resources";

export default function Page() {
	return (
		<main>
			<ResourcesGrid resources={resources} />
		</main>
	);
}

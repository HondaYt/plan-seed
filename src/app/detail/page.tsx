"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function Page() {
	const searchParams = useSearchParams();
	const conceptParam = searchParams.get("concept");
	const concept = conceptParam ? decodeURIComponent(conceptParam) : "";

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1>選択された企画コンセプト</h1>
				<div className={styles.conceptBox}>
					<p>{concept}</p>
				</div>
			</div>
		</main>
	);
}

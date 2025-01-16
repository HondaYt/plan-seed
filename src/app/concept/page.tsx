"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function Page() {
	const searchParams = useSearchParams();
	const wordsParam = searchParams.get("words");
	const words = wordsParam ? decodeURIComponent(wordsParam).split(",") : [];

	return (
		<div className={styles.container}>
			<h1>コンセプト作成</h1>
			<div className={styles.wordList}>
				<h2>選択した単語：</h2>
				<ul>
					{words.map((word) => (
						<li key={word}>{word}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

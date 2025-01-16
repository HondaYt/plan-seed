"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import { LinkBtn } from "@/app/components/Btn/LinkBtn";

interface ConceptResponse {
	concepts?: string[];
	error?: string;
}

export default function Page() {
	const searchParams = useSearchParams();
	const wordsParam = searchParams.get("words");
	const words = wordsParam ? decodeURIComponent(wordsParam).split(",") : [];
	const [concepts, setConcepts] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedConcept, setSelectedConcept] = useState<string>("");

	const generateConcepts = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/conceptGpt", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ words }),
			});
			const data: ConceptResponse = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			if (data.concepts && data.concepts.length > 0) {
				setConcepts(data.concepts);
				setSelectedConcept("");
			} else {
				throw new Error("企画案の生成に失敗しました");
			}
		} catch (error) {
			console.error("Error:", error);
			alert(
				error instanceof Error
					? error.message
					: "企画案の生成中にエラーが発生しました",
			);
		} finally {
			setLoading(false);
		}
	};

	// 一意のキーを生成する関数
	const generateConceptKey = (concept: string) => {
		return `concept-${Buffer.from(concept).toString("base64")}`;
	};

	return (
		<main className={styles.main}>
			<div className={styles.wordList}>
				<h2>選択した単語：</h2>
				<ul>
					{words.map((word) => (
						<li key={word}>{word}</li>
					))}
				</ul>
				<button
					type="button"
					className={styles.generateButton}
					onClick={generateConcepts}
					disabled={loading || words.length === 0}
				>
					{loading ? "生成中..." : "企画案を生成"}
				</button>
			</div>
			{concepts.length > 0 && (
				<div className={styles.conceptsContainer}>
					<h2>企画コンセプト：</h2>
					<div className={styles.conceptsContent}>
						{concepts.map((concept) => (
							<Link
								key={generateConceptKey(concept)}
								className={`${styles.conceptItem} ${
									selectedConcept === concept ? styles.selected : ""
								}`}
								href={`target?concept=${concept}`}
								onClick={() => setSelectedConcept(concept)}
							>
								{concept}
							</Link>
						))}
						<LinkBtn secondary href={"concept/other"}>
							自分で考える
						</LinkBtn>
					</div>
				</div>
			)}
		</main>
	);
}
"use client";

import { LinkBtn } from "@/app/components/Btn/LinkBtn";
import styles from "./page.module.css";
import { useState, Suspense } from "react";

function ConceptOtherContent() {
	const [state, setState] = useState("");
	return (
		<main className={styles.main}>
			<input
				className={styles.input}
				type="text"
				value={state}
				onChange={(e) => {
					setState(e.target.value);
				}}
			/>
			<LinkBtn
				disable={state === ""}
				href={{
					pathname: "/target",
					query: { concept: `${state}` },
				}}
			>
				次へ進む
			</LinkBtn>
		</main>
	);
}

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ConceptOtherContent />
		</Suspense>
	);
}

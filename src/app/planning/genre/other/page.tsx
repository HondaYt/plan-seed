"use client";

import { LinkBtn } from "@/app/components/Btn/LinkBtn";
import styles from "./page.module.css";
import { useState } from "react";

export default function Page() {
	const [state, setState] = useState("");
	return (
		<>
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
						pathname: "/planning/mind-map",
						query: { genre: `${state}` },
					}}
				>
					次へ進む
				</LinkBtn>
			</main>
		</>
	);
}

"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Sec02() {
	const cards = [
		{
			title: "最初のカード",
			description: "最初に作ったカードです。",
			cardColor: "tomato",
		},
		{
			title: "tintin",
			description: "これはtintinです。",
			cardColor: "blue",
			textColor: "white",
		},
		{
			title: "ほんだゆうと",
			description: "天才です。",
			cardColor: "green",
			textColor: "white",
		},
	];
	return (
		<>
			<Link href="sec01">sec01</Link>
			{cards.map((card) => (
				<Card
					key={card.title}
					title={card.title}
					description={card.description}
					cardColor={card.cardColor}
					textColor={card.textColor}
				/>
			))}
		</>
	);
}

type cardProps = {
	title: string;
	description: string;
	cardColor?: string;
	textColor?: string;
};

function Card(props: cardProps) {
	return (
		<div
			className={styles.card}
			style={{ background: `${props.cardColor}`, color: `${props.textColor}` }}
		>
			<h3>{props.title}</h3>
			<p>{props.description}</p>
		</div>
	);
}

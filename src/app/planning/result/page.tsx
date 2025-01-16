"use client";

import styles from "./page.module.css";
import { LinkBtn } from "@/app/components/Btn/LinkBtn";
import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";

const getGenderLabel = (gender: string): string => {
	switch (gender) {
		case "male":
			return "男性";
		case "female":
			return "女性";
		case "other":
			return "その他";
		default:
			return gender;
	}
};

export default function Page() {
	const state = useContext(StateContext);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1>企画概要</h1>

				<section className={styles.section}>
					<h2>基本情報</h2>
					<div className={styles.content}>
						{state.genre && <p>ジャンル: {state.genre}</p>}
						{state.keywords.length > 0 && (
							<div className={styles.keywords}>
								<p>キーワード:</p>
								<ul>
									{state.keywords.map((keyword) => (
										<li key={keyword}>{keyword}</li>
									))}
								</ul>
							</div>
						)}
						{state.concept && (
							<div className={styles.concept}>
								<p>企画コンセプト:</p>
								<p>{state.concept}</p>
							</div>
						)}
					</div>
				</section>

				<section className={styles.section}>
					<h2>ターゲット</h2>
					<div className={styles.content}>
						{(state.target.ageMin || state.target.ageMax) && (
							<p>
								年齢層: {state.target.ageMin}歳 〜 {state.target.ageMax}歳
							</p>
						)}
						{state.target.gender && (
							<p>性別: {getGenderLabel(state.target.gender)}</p>
						)}
						{state.target.occupation && <p>職業: {state.target.occupation}</p>}
					</div>
				</section>

				<section className={styles.section}>
					<h2>使用シーン</h2>
					<div className={styles.content}>
						{state.scene.when && <p>利用タイミング: {state.scene.when}</p>}
						{state.scene.where && <p>利用場所: {state.scene.where}</p>}
					</div>
				</section>

				<section className={styles.section}>
					<h2>機能</h2>
					<div className={styles.content}>
						{state.mainFeature && (
							<div className={styles.mainFeature}>
								<h3>メイン機能</h3>
								<p>{state.mainFeature}</p>
							</div>
						)}
						{state.features.length > 0 && (
							<div className={styles.features}>
								<h3>その他の機能</h3>
								{state.features
									.filter((feature) => feature !== state.mainFeature)
									.map((feature) => (
										<p key={feature}>{feature}</p>
									))}
							</div>
						)}
					</div>
				</section>

				<div className={styles.buttonContainer}>
					<LinkBtn href={"/"}>はじめからする</LinkBtn>
				</div>
			</div>
		</main>
	);
}

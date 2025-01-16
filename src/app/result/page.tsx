"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { LinkBtn } from "../components/Btn/LinkBtn";

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
	const searchParams = useSearchParams();
	const genre = searchParams.get("genre");
	const wordsParam = searchParams.get("words");
	const conceptParam = searchParams.get("concept");
	const ageMin = searchParams.get("ageMin");
	const ageMax = searchParams.get("ageMax");
	const gender = searchParams.get("gender");
	const occupationParam = searchParams.get("occupation");
	const when = searchParams.get("when");
	const where = searchParams.get("where");
	const featuresParam = searchParams.get("features");
	const mainFeatureParam = searchParams.get("mainFeature");

	const keywords = wordsParam ? decodeURIComponent(wordsParam).split(",") : [];
	const concept = conceptParam ? decodeURIComponent(conceptParam) : "";
	const occupation = occupationParam ? decodeURIComponent(occupationParam) : "";
	const features = featuresParam
		? decodeURIComponent(featuresParam).split(",")
		: [];
	const mainFeature = mainFeatureParam
		? decodeURIComponent(mainFeatureParam)
		: "";

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1>企画概要</h1>

				<section className={styles.section}>
					<h2>基本情報</h2>
					<div className={styles.content}>
						{genre && <p>ジャンル: {genre}</p>}
						{keywords.length > 0 && (
							<div className={styles.keywords}>
								<p>キーワード:</p>
								<ul>
									{keywords.map((keyword) => (
										<li key={keyword}>{keyword}</li>
									))}
								</ul>
							</div>
						)}
						{concept && (
							<div className={styles.concept}>
								<p>企画コンセプト:</p>
								<p>{concept}</p>
							</div>
						)}
					</div>
				</section>

				<section className={styles.section}>
					<h2>ターゲット</h2>
					<div className={styles.content}>
						{(ageMin || ageMax) && (
							<p>
								年齢層: {ageMin}歳 〜 {ageMax}歳
							</p>
						)}
						{gender && <p>性別: {getGenderLabel(gender)}</p>}
						{occupation && <p>職業: {occupation}</p>}
					</div>
				</section>

				<section className={styles.section}>
					<h2>使用シーン</h2>
					<div className={styles.content}>
						{when && <p>利用タイミング: {decodeURIComponent(when)}</p>}
						{where && <p>利用場所: {decodeURIComponent(where)}</p>}
					</div>
				</section>

				<section className={styles.section}>
					<h2>機能</h2>
					<div className={styles.content}>
						{mainFeature && (
							<div className={styles.mainFeature}>
								<h3>メイン機能</h3>
								<p>{mainFeature}</p>
							</div>
						)}
						{features.length > 0 && (
							<div className={styles.features}>
								<h3>その他の機能</h3>
								{features
									.filter((feature) => feature !== mainFeature)
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

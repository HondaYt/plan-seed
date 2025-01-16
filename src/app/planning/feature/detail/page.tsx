"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import styles from "./page.module.css";
import { LinkBtn } from "@/app/components/Btn/LinkBtn";

function DetailContent() {
	const [mainFeature, setMainFeature] = useState<string>("");
	const [targetUrl, setTargetUrl] = useState("/result");

	return (
		<DetailContentInner
			mainFeature={mainFeature}
			setMainFeature={setMainFeature}
			targetUrl={targetUrl}
			setTargetUrl={setTargetUrl}
		/>
	);
}

function DetailContentInner({
	mainFeature,
	setMainFeature,
	targetUrl,
	setTargetUrl,
}: {
	mainFeature: string;
	setMainFeature: (value: string) => void;
	targetUrl: string;
	setTargetUrl: (value: string) => void;
}) {
	const searchParams = useSearchParams();
	const featuresParam = searchParams.get("features");
	const features = featuresParam
		? decodeURIComponent(featuresParam).split(",")
		: [];

	useEffect(() => {
		const params = new URLSearchParams();
		// すべての機能を送信
		params.append("features", encodeURIComponent(features.join(",")));
		// メイン機能を送信
		if (mainFeature) {
			params.append("mainFeature", encodeURIComponent(mainFeature));
		}
		// その他のパラメータを維持
		searchParams.forEach((value, key) => {
			if (key !== "features" && key !== "mainFeature") {
				params.append(key, value);
			}
		});
		setTargetUrl(`/planning/result?${params.toString()}`);
	}, [mainFeature, features, searchParams, setTargetUrl]);

	return (
		<div className={styles.container}>
			<h1>メイン機能を選択</h1>
			<div className={styles.featureList}>
				{features.map((feature) => (
					<label key={feature} className={styles.featureItem}>
						<input
							type="radio"
							name="mainFeature"
							value={feature}
							checked={mainFeature === feature}
							onChange={(e) => setMainFeature(e.target.value)}
							className={styles.radio}
						/>
						{feature}
					</label>
				))}
			</div>
			<div className={styles.buttonContainer}>
				<LinkBtn disable={!mainFeature} href={targetUrl}>
					次へ進む
				</LinkBtn>
			</div>
		</div>
	);
}

export default function Page() {
	return (
		<main className={styles.main}>
			<Suspense fallback={<div>Loading...</div>}>
				<DetailContent />
			</Suspense>
		</main>
	);
}

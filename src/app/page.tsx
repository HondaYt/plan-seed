"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { LinkBtn } from "@/app/components/Btn/LinkBtn";

export default function Page() {
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<div className={styles.header}>
					<Image
						src={"/logo.svg"}
						height={100}
						width={500}
						alt="Plan Seed"
						className={styles.logo}
					/>
					<p className={styles.catchphrase}>アイデアを育て、企画を実らせる</p>
				</div>

				<div className={styles.features}>
					<div className={styles.featureItem}>
						<div className={styles.iconWrapper}>
							<Image
								src={"/icons/idea.svg"}
								height={40}
								width={40}
								alt="アイデア"
							/>
						</div>
						<h2>アイデア整理</h2>
						<p>
							マインドマップで自由に発想を
							<br />
							広げ、アイデアを整理できます
						</p>
					</div>
					<div className={styles.featureItem}>
						<div className={styles.iconWrapper}>
							<Image
								src={"/icons/target.svg"}
								height={40}
								width={40}
								alt="ターゲット"
							/>
						</div>
						<h2>ターゲット設定</h2>
						<p>
							ユーザー像を具体的に設定し、
							<br />
							ニーズを明確にします
						</p>
					</div>
					<div className={styles.featureItem}>
						<div className={styles.iconWrapper}>
							<Image
								src={"/icons/feature.svg"}
								height={40}
								width={40}
								alt="機能"
							/>
						</div>
						<h2>機能定義</h2>
						<p>必要な機能を洗い出し、優先順位をつけて整理します</p>
					</div>
				</div>

				<div className={styles.startSection}>
					<p className={styles.startText}>
						さあ、あなたの企画づくりを始めましょう！
					</p>
					<LinkBtn href={"/planning/genre"}>はじめる</LinkBtn>
				</div>
			</div>
		</main>
	);
}

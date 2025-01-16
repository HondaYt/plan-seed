"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { LinkBtn } from "@/app/components/Btn/LinkBtn";

interface AgeRange {
	min: string;
	max: string;
}

export default function Page() {
	const searchParams = useSearchParams();
	const conceptParam = searchParams.get("concept");
	const concept = conceptParam ? decodeURIComponent(conceptParam) : "";

	const [ageRange, setAgeRange] = useState<AgeRange>({
		min: "",
		max: "",
	});
	const [gender, setGender] = useState("");
	const [occupation, setOccupation] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);
	const [targetUrl, setTargetUrl] = useState("scene");

	useEffect(() => {
		const isValid =
			ageRange.min !== "" &&
			ageRange.max !== "" &&
			Number(ageRange.min) <= Number(ageRange.max) &&
			gender !== "" &&
			occupation.trim() !== "";

		setIsFormValid(isValid);

		if (isValid) {
			const params = new URLSearchParams();
			if (conceptParam) params.append("concept", conceptParam);
			params.append("ageMin", ageRange.min);
			params.append("ageMax", ageRange.max);
			params.append("gender", gender);
			params.append("occupation", encodeURIComponent(occupation));
			setTargetUrl(`scene?${params.toString()}`);
		}
	}, [ageRange, gender, occupation, conceptParam]);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.targetForm}>
					<h2>ターゲット設定</h2>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className={styles.formGroup}>
							<label htmlFor="age-min">年齢範囲</label>
							<div className={styles.ageRange}>
								<input
									id="age-min"
									type="number"
									min="0"
									max="100"
									value={ageRange.min}
									onChange={(e) =>
										setAgeRange({
											...ageRange,
											min: e.target.value,
										})
									}
									required
								/>
								<span> 〜 </span>
								<input
									id="age-max"
									type="number"
									min="0"
									max="100"
									value={ageRange.max}
									onChange={(e) =>
										setAgeRange({
											...ageRange,
											max: e.target.value,
										})
									}
									required
								/>
								<span>歳</span>
							</div>
						</div>

						<div className={styles.formGroup}>
							<p className={styles.radioLabel}>性別</p>
							<div className={styles.radioGroup}>
								<div className={styles.radioItem}>
									<input
										type="radio"
										id="gender-male"
										name="gender"
										value="male"
										checked={gender === "male"}
										onChange={(e) => setGender(e.target.value)}
										required
									/>
									<label htmlFor="gender-male">男性</label>
								</div>
								<div className={styles.radioItem}>
									<input
										type="radio"
										id="gender-female"
										name="gender"
										value="female"
										checked={gender === "female"}
										onChange={(e) => setGender(e.target.value)}
									/>
									<label htmlFor="gender-female">女性</label>
								</div>
								<div className={styles.radioItem}>
									<input
										type="radio"
										id="gender-other"
										name="gender"
										value="other"
										checked={gender === "other"}
										onChange={(e) => setGender(e.target.value)}
									/>
									<label htmlFor="gender-other">その他</label>
								</div>
							</div>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="occupation">職業</label>
							<input
								id="occupation"
								type="text"
								value={occupation}
								onChange={(e) => setOccupation(e.target.value)}
								required
								placeholder="職業を入力してください"
							/>
						</div>

						<div className={styles.buttonContainer}>
							<LinkBtn disable={!isFormValid} href={targetUrl}>
								次へ進む
							</LinkBtn>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

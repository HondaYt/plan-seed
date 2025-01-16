"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { LinkBtn } from "@/app/components/Btn/LinkBtn";

interface SceneForm {
	when: string;
	where: string;
}

export default function Page() {
	const searchParams = useSearchParams();
	const [formData, setFormData] = useState<SceneForm>({
		when: "",
		where: "",
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const [targetUrl, setTargetUrl] = useState("feature");

	useEffect(() => {
		const isValid = formData.when.trim() !== "" && formData.where.trim() !== "";
		setIsFormValid(isValid);

		if (isValid) {
			const params = new URLSearchParams(searchParams.toString());
			params.append("when", encodeURIComponent(formData.when.trim()));
			params.append("where", encodeURIComponent(formData.where.trim()));
			setTargetUrl(`feature?${params.toString()}`);
		}
	}, [formData, searchParams]);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.sceneForm}>
					<h2>使用場面設定</h2>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className={styles.formGroup}>
							<label htmlFor="when">いつ</label>
							<textarea
								id="when"
								value={formData.when}
								onChange={(e) =>
									setFormData({ ...formData, when: e.target.value })
								}
								required
								placeholder="例：休日の午後、仕事帰りの電車の中、など"
								rows={3}
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="where">どこで</label>
							<textarea
								id="where"
								value={formData.where}
								onChange={(e) =>
									setFormData({ ...formData, where: e.target.value })
								}
								required
								placeholder="例：自宅のリビング、カフェ、公園、など"
								rows={3}
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
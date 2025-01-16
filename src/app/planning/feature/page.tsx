"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { LinkBtn } from "@/app/components/Btn/LinkBtn";
import { useSearchParams } from "next/navigation";

type Feature = {
	id: string;
	text: string;
	isSelected: boolean;
};

type State = {
	input: string;
	list: Feature[];
};

export default function Page() {
	const searchParams = useSearchParams();
	const [state, setState] = useState<State>({
		input: "",
		list: [],
	});
	const [targetUrl, setTargetUrl] = useState("feature/detail");

	const handleAdd = () => {
		if (state.input.trim() === "") return;
		setState({
			...state,
			list: [
				...state.list,
				{
					id: `feature-${Date.now()}`,
					text: state.input.trim(),
					isSelected: false,
				},
			],
			input: "",
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.nativeEvent.isComposing) {
			handleAdd();
		}
	};

	const handleToggleSelect = (id: string) => {
		const newList = state.list.map((item) =>
			item.id === id ? { ...item, isSelected: !item.isSelected } : item,
		);

		// 選択されたアイテムを先頭に移動
		const selectedItems = newList.filter((item) => item.isSelected);
		const unselectedItems = newList.filter((item) => !item.isSelected);

		setState({
			...state,
			list: [...selectedItems, ...unselectedItems],
		});
	};

	useEffect(() => {
		const selectedFeatures = state.list
			.filter((item) => item.isSelected)
			.map((item) => item.text);

		if (selectedFeatures.length > 0) {
			const params = new URLSearchParams(searchParams.toString());
			params.append("features", encodeURIComponent(selectedFeatures.join(",")));
			setTargetUrl(`feature/detail?${params.toString()}`);
		} else {
			setTargetUrl("feature/detail");
		}
	}, [state.list, searchParams]);

	const hasSelectedFeatures = state.list.some((item) => item.isSelected);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1>機能・要素の設定</h1>
				<div className={styles.inputGroup}>
					<input
						type="text"
						className={styles.input}
						value={state.input}
						onChange={(e) => {
							setState({
								...state,
								input: e.target.value,
							});
						}}
						onKeyDown={handleKeyDown}
						placeholder="新しい機能を入力してください"
					/>
					<button
						type="button"
						className={styles.addButton}
						onClick={handleAdd}
					>
						追加
					</button>
				</div>
				<div className={styles.featureList}>
					{state.list.map((item) => (
						<button
							key={item.id}
							type="button"
							className={`${styles.featureItem} ${
								item.isSelected ? styles.selected : ""
							}`}
							onClick={() => handleToggleSelect(item.id)}
							aria-pressed={item.isSelected}
						>
							{item.text}
						</button>
					))}
				</div>
			</div>
			<LinkBtn disable={!hasSelectedFeatures} href={targetUrl}>
				次へ
			</LinkBtn>
		</main>
	);
}

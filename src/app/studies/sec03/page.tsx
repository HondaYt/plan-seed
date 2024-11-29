"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./page.module.css";

import Link from "next/link";

type ListItem = {
	id: string;
	value: string;
};

export default function Sec03() {
	const [list, setList] = useState<ListItem[]>([]); //リスト項目の配列
	const [search, setSearch] = useState(""); //入力フィールドの現在の値

	//クリックイベントでリストにアイテムを追加
	const handleAddItem = () => {
		const trimmedValue = search.trim();
		if (trimmedValue !== "") {
			//新しい項目リストの追加
			setList((prevList) => [
				...prevList,
				{ id: uuidv4(), value: trimmedValue },
			]);
			setSearch(""); //入力をクリア
		}
	};
	//アイテムを削除する関数（idを）
	const clear = (id: string) => {
		setList((prevList) => prevList.filter((item) => item.id !== id)); //指定されたidの削除
	};

	return (
		<div className={styles.listWrap}>
			{" "}
			{/*class名を指定するときはclassName={styles.〇〇}で指定する*/}
			<h1 className={styles.title}>リスト</h1>
			<input
				className={styles.search}
				type="text"
				placeholder="キーワードを入力"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button className={styles.btn} type="button" onClick={handleAddItem}>
				クリック
			</button>
			<div>
				<h2>リスト要素の一覧</h2>
				<ul className={styles.list}>
					{list.map((item) => (
						<li key={item.id} className={styles.listItem}>
							<span>{item.value}</span>
							<button
								className={styles.clearBtn}
								onClick={() => clear(item.id)}
								type="button"
							>
								クリア
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

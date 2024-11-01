"use client";
import { useState } from "react";
import { ConvertibleInput } from "@/app/components/ConvertibleInput/ConvertibleInput";
import styles from "./page.module.css";

interface TreeNode {
	id: number;
	text?: string;
	children: TreeNode[];
}

export default function Demo01() {
	const [textValue, setTextValue] = useState("");
	const [tree, setTree] = useState<TreeNode>({ id: 0, children: [] });
	const [nextId, setNextId] = useState(1);
	const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
	const [selectedLanguage, setSelectedLanguage] = useState<string>("ja");

	const getAllWords = (node: TreeNode): string[] => {
		const words: string[] = [];
		if (node.text) words.push(node.text);
		for (const child of node.children) {
			words.push(...getAllWords(child));
		}
		return words;
	};

	const getAssociatedWord = async (word: string) => {
		try {
			const currentWords = getAllWords(tree);
			if (textValue) currentWords.push(textValue);

			const response = await fetch("/api/mindMapGpt", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: word,
					usedWords: Array.from(usedWords),
					language: selectedLanguage,
				}),
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.error);

			// 新しい単語を使用済みリストに追加
			setUsedWords((prev) => new Set([...prev, data.content]));
			return data.content;
		} catch (error) {
			console.error("エラーが発生しました:", error);
			return "エラー";
		}
	};

	const handleButtonClick = async () => {
		if (textValue) {
			setUsedWords((prev) => new Set([...prev, textValue]));
			const associatedWord = await getAssociatedWord(textValue);
			const newChild = { id: nextId, text: associatedWord, children: [] };
			setNextId((prevId) => prevId + 1);
			setTree((prevTree) => ({
				...prevTree,
				children: [...prevTree.children, newChild],
			}));
		}
	};

	const handleChildClick = async (node: TreeNode) => {
		const nodeText = node.text || `testText ${node.id}`;
		const associatedWord = await getAssociatedWord(nodeText);

		setTree((prevTree) => {
			const updateTree = (currentNode: TreeNode): TreeNode => {
				if (currentNode.id === node.id) {
					return {
						...currentNode,
						children: [
							...currentNode.children,
							{ id: nextId, text: associatedWord, children: [] },
						],
					};
				}
				return {
					...currentNode,
					children: currentNode.children.map(updateTree),
				};
			};
			setNextId((prevId) => prevId + 1);
			return updateTree(prevTree);
		});
	};

	const renderNode = (node: TreeNode, isRoot = false) => (
		<div key={node.id} className={styles.parent}>
			{isRoot ? (
				<ConvertibleInput
					textValue={textValue}
					setTextValue={setTextValue}
					onButtonClick={handleButtonClick}
				/>
			) : (
				<div className={styles.box} onClick={() => handleChildClick(node)}>
					{node.text || `testText ${node.id}`}
				</div>
			)}
			<div className={styles.children}>
				{node.children.map((child) => renderNode(child))}
			</div>
		</div>
	);

	return (
		<main>
			{" "}
			<select
				value={selectedLanguage}
				onChange={(e) => setSelectedLanguage(e.target.value)}
				className={styles.languageSelect}
			>
				<option value="ja">日本語</option>
				<option value="en">English</option>
				<option value="es">Español</option>
				<option value="fr">Français</option>
			</select>
			{renderNode(tree, true)}
		</main>
	);
}

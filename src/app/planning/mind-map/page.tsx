"use client";
import { useState, useEffect } from "react";
import { ConvertibleInput } from "@/app/components/ConvertibleInput/ConvertibleInput";
import styles from "./page.module.css";
import { Tutorial } from "@/app/components/Tutorial/Tutorial";
import { Sidebar } from "@/app/components/MMSidebar/Sidebar";
import { useSearchParams } from "next/navigation";

interface TreeNode {
	id: number;
	text?: string;
	children: TreeNode[];
}

interface LikedWord {
	id: string;
	word: string;
	timestamp: number;
}

export default function Future01() {
	const [textValue, setTextValue] = useState("");
	const [tree, setTree] = useState<TreeNode>({ id: 0, children: [] });
	const [nextId, setNextId] = useState(1);
	const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
	const [selectedLanguage, setSelectedLanguage] = useState<string>("ja");
	const [likedWords, setLikedWords] = useState<LikedWord[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showTutorial, setShowTutorial] = useState(true);
	const searchParams = useSearchParams();

	useEffect(() => {
		const tutorialPreference = localStorage.getItem("hideTutorial");
		if (tutorialPreference === "true") {
			setShowTutorial(false);
		}
	}, []);

	const handleTutorialPreference = (hideForever: boolean) => {
		if (hideForever) {
			localStorage.setItem("hideTutorial", "true");
		}
		setShowTutorial(false);
	};

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
			setIsLoading(true);
			const currentWords = getAllWords(tree);
			if (textValue) currentWords.push(textValue);
			const genre = searchParams.get("genre") || "other";

			const response = await fetch("/api/mindMapGpt", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: word,
					usedWords: Array.from(usedWords),
					language: selectedLanguage,
					genre: genre,
				}),
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.error);

			setUsedWords((prev) => new Set([...prev, data.content]));
			return data.content;
		} catch (error) {
			console.error("エラーが発生しました:", error);
			return "エラー";
		} finally {
			setIsLoading(false);
		}
	};

	const handleButtonClick = async () => {
		if (textValue && !isLoading) {
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
		if (isLoading) return;

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

	const handleToggleLike = (node: TreeNode) => {
		const nodeId = String(node.id);
		const isLiked = likedWords.some((liked) => liked.id === nodeId);

		if (isLiked) {
			// いいね済みの場合は削除
			setLikedWords((prev) => prev.filter((word) => word.id !== nodeId));
		} else {
			// いいねされていない場合は追加
			const newLikedWord: LikedWord = {
				id: nodeId,
				word: node.text || `testText ${node.id}`,
				timestamp: Date.now(),
			};
			setLikedWords((prev) => [...prev, newLikedWord]);
		}
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
				<div className={styles.nodeContainer}>
					<button
						className={styles.box}
						onClick={() => handleChildClick(node)}
						type="button"
					>
						{node.text || `testText ${node.id}`}
					</button>
					<button
						className={`${styles.likeButton} ${
							likedWords.some((liked) => liked.id === String(node.id))
								? styles.liked
								: ""
						}`}
						onClick={() => handleToggleLike(node)}
						type="button"
					>
						<span style={{ fontSize: "0.8em" }}>
							{likedWords.some((liked) => liked.id === String(node.id))
								? "♥"
								: "♡"}
						</span>
					</button>
				</div>
			)}
			<div className={styles.children}>
				{node.children.map((child) => renderNode(child))}
			</div>
		</div>
	);

	const tutorialSteps = [
		{
			target: "input",
			content: "まずは、ワードを入力しましょう。",
			// position: "bottom" as const,
			image: "/tutorial/step1.jpg",
		},
		{
			target: "box",
			content: "ボックスをクリックすると関連するワードが生成されます",
			// position: "right" as const,
			image: "/tutorial/step2.jpg",
		},
		{
			target: "like",
			content: "気に入ったワードにいいねをつけましょう",
			// position: "top" as const,
			image: "/tutorial/step3.jpg",
		},
		{
			target: "result",
			content: "企画のゴールが出力されます",
			// position: "top" as const,
			image: "/tutorial/step4.jpg",
		},
	];

	return (
		<Tutorial
			steps={tutorialSteps}
			isOpen={showTutorial}
			onClose={() => setShowTutorial(false)}
			onHideForever={() => handleTutorialPreference(true)}
		>
			<div className={styles.container}>
				<main className={`${styles.main} ${isLoading ? styles.loading : ""}`}>
					{renderNode(tree, true)}
				</main>
				<Sidebar
					inputText={textValue}
					likedWords={likedWords}
					onUnlike={(id) => handleToggleLike({ id: Number(id), children: [] })}
				/>
			</div>
		</Tutorial>
	);
}

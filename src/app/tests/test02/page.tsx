"use client";

import { useState } from "react";
import styles from "./test01.module.css";

interface TreeNode {
	id: number;
	children: TreeNode[];
}

export default function Test02() {
	const [tree, setTree] = useState<TreeNode>({ id: 0, children: [] });
	const [nextId, setNextId] = useState(1);

	const handleClick = (node: TreeNode) => {
		setTree((prevTree) => {
			const newChild = { id: nextId, children: [] };
			setNextId((prevId) => prevId + 1);

			const updateTree = (currentNode: TreeNode): TreeNode => {
				if (currentNode.id === node.id) {
					return {
						...currentNode,
						children: [...currentNode.children, newChild],
					};
				}
				return {
					...currentNode,
					children: currentNode.children.map(updateTree),
				};
			};

			return updateTree(prevTree);
		});
	};

	const renderNode = (node: TreeNode) => (
		<div key={node.id} className={styles.parent}>
			<div className={styles.box} onClick={() => handleClick(node)}>
				testText {node.id}
			</div>
			<div className={styles.children}>{node.children.map(renderNode)}</div>
		</div>
	);

	return <main>{renderNode(tree)}</main>;
}

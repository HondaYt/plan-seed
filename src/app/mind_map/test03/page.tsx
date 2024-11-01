"use client";

import { useCallback, useState } from "react";
import {
	ReactFlow,
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	BackgroundVariant,
	type Connection,
	type Node,
	type Edge,
	Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
	{
		id: "0",
		type: "input",
		data: { label: "メイン" },
		position: { x: 250, y: 250 },
		style: { background: "#f0f0f0", padding: 10 },
		sourcePosition: Position.Top,
		targetPosition: Position.Bottom,
	},
];

const initialEdges: Edge[] = [];

export default function Test02() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [nextId, setNextId] = useState(1);

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	const onNodeClick = useCallback(
		(_: React.MouseEvent, node: Node) => {
			const randomOffset = Math.random() * 200 - 100;
			const newNode = {
				id: nextId.toString(),
				type: "default",
				data: { label: `アイデア ${nextId}` },
				position: {
					x:
						(node as { position: { x: number; y: number } }).position.x +
						randomOffset,
					y: (node as { position: { x: number; y: number } }).position.y - 100,
				},
				style: {
					background: "#f0f0f0",
					padding: 10,
				},
				sourcePosition: Position.Top,
				targetPosition: Position.Bottom,
			};

			const newEdge = {
				id: `e${node.id}-${nextId}`,
				source: node.id,
				target: newNode.id,
				type: "smoothstep",
			};

			setNodes((nds) => [...nds, newNode]);
			setEdges((eds) => [...eds, newEdge]);
			setNextId((prev) => prev + 1);
		},
		[nextId, setNodes, setEdges],
	);

	return (
		<main style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onNodeClick={onNodeClick}
				fitView
			>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</main>
	);
}

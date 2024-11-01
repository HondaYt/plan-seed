"use client";

import { useCallback } from "react";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
	{
		id: "main",
		type: "input",
		data: { label: "メインアイデア" },
		position: { x: 250, y: 0 },
		style: { background: "#f0f0f0", padding: 10 },
	},
	{
		id: "sub1",
		data: { label: "サブアイデア1" },
		position: { x: 100, y: 100 },
	},
	{
		id: "sub2",
		data: { label: "サブアイデア2" },
		position: { x: 400, y: 100 },
	},
];

const initialEdges = [
	{ id: "e1-2", source: "main", target: "sub1" },
	{ id: "e1-3", source: "main", target: "sub2" },
];

export default function Test02() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	return (
		<main style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</main>
	);
}

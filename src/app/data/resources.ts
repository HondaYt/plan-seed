import type { Resource, ResourceLink } from "@/app/types/resources";

export const resources: Resource[] = [
	{
		title: "📚 勉強",
		href: "studies",
		links: [
			{
				href: "sec01",
				title: "section01",
				description: "useStateについて",
				date: "2024/10/21",
			},
			{
				href: "sec02",
				title: "section02",
				description: "Componentについて",
				date: "2024/10/25",
			},
			{
				href: "sec03",
				title: "section03",
				description: "あああ",
				date: "2124/10/25",
			},
			{
				href: "sec04",
				title: "section04",
				description: "あああ",
				date: "2124/10/25",
			},
		],
	},
	{
		title: "🧭 MindMap",
		href: "mind_map",
		links: [
			{
				href: "test01",
				title: "test01",
				description: "マインドマップぽいもの",
				date: "2024/10/24",
			},
			{
				href: "test02",
				title: "test02",
				description: "React Flowを導入",
				date: "2024/10/31",
			},
			{
				href: "test03",
				title: "test03",
				description: "React Flowでtest01の動作を作成",
				date: "2024/10/31",
			},
		],
	},
	{
		title: "🤖 Chat GPT",
		href: "chat-gpt",
		links: [
			{
				href: "test01",
				title: "Test01",
				description: "open-aiのapiをテスト",
				date: "2024/10/31",
			},
			{
				href: "test02",
				title: "Test02",
				description: "最初のボタン",
				date: "2024/10/31",
			},
		],
	},
	// {
	// 	title: "🚬 テンプレート",
	// 	href: "templates",
	// 	links: [
	// 		{
	// 			href: "template01",
	// 			title: "テンプレート01",
	// 			description: "これはテンプレートです。",
	// 			date: "2100/09/27",
	// 		},
	// 	],
	// },

	{
		title: "📦 機能",
		href: "futures",
		links: [
			{
				href: "future01",
				title: "future01",
				description: "マインドマップの自動生成機能",
				date: "2024/10/31",
			},
			{
				href: "future02",
				title: "future02",
				description: "タイマー機能の実装",
				date: "2024/12/06",
			},
			{
				href: "future03",
				title: "future03",
				description: "共同編集Note",
				date: "2024/12/06",
			},
		],
	},
];

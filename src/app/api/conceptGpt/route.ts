import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
	try {
		const { words } = await request.json();

		const prompt = `
You are tasked with generating 3 innovative project concepts in Japanese based on the following keywords.
Each concept should be expressed in a single, concise sentence that captures the core idea.

Requirements:
- Generate exactly 3 concepts
- Each concept should be creative and unique
- Maintain a professional tone
- Output in Japanese
- Return as a JSON array format
- Do not include any numbering or prefixes
- The concepts do not necessarily need to include the exact keywords, but should be inspired by or related to them

Keywords: ${words.join(", ")}

Return your response in this exact format:
[
  "concept1",
  "concept2",
  "concept3"
]
`;

		const completion = await openai.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			// model: "gpt-3.5-turbo",
			model: "gpt-4o",
			temperature: 0.8,
		});

		// nullチェックを追加
		const content = completion.choices[0]?.message?.content;
		if (!content) {
			throw new Error("APIからの応答が不正です");
		}

		try {
			// JSON文字列をパースして配列に変換
			const concepts = JSON.parse(content);
			if (!Array.isArray(concepts) || concepts.length !== 3) {
				throw new Error("不正な形式の応答です");
			}

			return NextResponse.json({ concepts });
		} catch (parseError) {
			console.error("Parse Error:", parseError);
			throw new Error("応答のパースに失敗しました");
		}
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "企画案の生成中にエラーが発生しました" },
			{ status: 500 },
		);
	}
}

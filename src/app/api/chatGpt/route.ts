import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = "gpt-3.5-turbo";
const DEFAULT_ERROR_MESSAGE = "エラーが発生しました。";
const DEFAULT_EMPTY_RESPONSE = "応答がありませんでした。";

const SYSTEM_MESSAGE =
	"あなたは親切で丁寧なアシスタントです。ユーザーの質問に対して、わかりやすく説明することを心がけています。";

interface ChatResponse {
	content: string;
	error?: string;
}

export async function POST(request: Request) {
	try {
		const { message } = await request.json();

		if (!message) {
			return NextResponse.json(
				{ error: "メッセージが必要です。" },
				{ status: 400 },
			);
		}

		const completion = await openai.chat.completions.create({
			messages: [
				{ role: "system", content: SYSTEM_MESSAGE },
				{ role: "user", content: message },
			],
			model: MODEL,
			temperature: 0.7,
		});

		const response: ChatResponse = {
			content:
				completion.choices[0]?.message?.content || DEFAULT_EMPTY_RESPONSE,
		};

		return NextResponse.json(response);
	} catch (error) {
		console.error("OpenAI API エラー:", error);

		return NextResponse.json({ error: DEFAULT_ERROR_MESSAGE }, { status: 500 });
	}
}

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// const MODEL = "gpt-3.5-turbo";
const MODEL = "gpt-4o";
const DEFAULT_ERROR_MESSAGE = "An error occurred.";
const DEFAULT_EMPTY_RESPONSE = "No response received.";

const SYSTEM_MESSAGE = `You are an assistant that performs word associations.
Please return only one word that is associated with the user's input word.
However, avoid words that have already been used.
Please respond with a single word in the specified language.
No explanation needed.`;

interface ChatResponse {
	content: string;
	error?: string;
}

export async function POST(request: Request) {
	try {
		const { message, usedWords, language } = await request.json();

		if (!message) {
			return NextResponse.json(
				{ error: "A message is required." },
				{ status: 400 },
			);
		}

		const completion = await openai.chat.completions.create({
			messages: [
				{ role: "system", content: SYSTEM_MESSAGE },
				{
					role: "user",
					content: `Please provide one word associated with "${message}" in ${language} language.
					Avoid using these previously used words:
					${usedWords.join(", ")}`,
				},
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
		console.error("OpenAI API error:", error);

		return NextResponse.json({ error: DEFAULT_ERROR_MESSAGE }, { status: 500 });
	}
}

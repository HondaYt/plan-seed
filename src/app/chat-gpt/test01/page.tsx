"use client";

import { useState } from "react";

export default function Template() {
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch("/api/chatGpt", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.error);

			setResponse(data.content);
		} catch (error) {
			console.error("エラーが発生しました:", error);
			setResponse("エラーが発生しました。");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main style={{ padding: "1rem" }}>
			<form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					style={{
						width: "100%",
						padding: "0.5rem",
						border: "1px solid #ccc",
						borderRadius: "4px",
						marginBottom: "1rem",
					}}
					placeholder="メッセージを入力してください"
				/>
				<button
					type="submit"
					disabled={isLoading}
					style={{
						padding: "0.5rem 1rem",
						backgroundColor: isLoading ? "#ccc" : "#0066cc",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: isLoading ? "not-allowed" : "pointer",
					}}
				>
					{isLoading ? "送信中..." : "送信"}
				</button>
			</form>

			{response && (
				<div
					style={{
						marginTop: "1rem",
						padding: "1rem",
						border: "1px solid #ccc",
						borderRadius: "4px",
					}}
				>
					<h2 style={{ fontWeight: "bold" }}>応答:</h2>
					<p>{response}</p>
				</div>
			)}
		</main>
	);
}

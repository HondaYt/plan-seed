"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./page.module.css";
import { ConvertibleInput } from "@/app/components/ConvertibleInput/ConvertibleInput";

export default function Test01() {
	const inputRef = useRef<HTMLInputElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);
	const [inputValue, setInputValue] = useState("");
	const [inputWidth, setInputWidth] = useState<number>(0);
	const [isCompleted, setIsCompleted] = useState(false);

	const updateWidth = useCallback(() => {
		if (spanRef.current) {
			setInputWidth(spanRef.current.clientWidth);
		}
	}, []);

	useEffect(() => {
		updateWidth();
	}, [updateWidth]);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(updateWidth);
		if (spanRef.current) {
			resizeObserver.observe(spanRef.current);
		}
		return () => resizeObserver.disconnect();
	}, [updateWidth]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.nativeEvent.isComposing) {
			setIsCompleted(true);
			console.log("コンプリート");
		}
	};

	const handleButtonClick = () => {
		console.log(inputValue);
	};

	return (
		<main className={styles.main}>
			<ConvertibleInput />
			{/* <div className={styles.ConvertibleInputContainer}>
				{!isCompleted ? (
					<>
						<input
							type="text"
							ref={inputRef}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
							style={{ width: `${inputWidth + 64}px` }}
							className={styles.ConvertibleInput}
						/>
						<span ref={spanRef} className={styles.hiddenText}>
							{inputValue}
						</span>
					</>
				) : (
					<button
						type="button"
						onClick={handleButtonClick}
						className={`${styles.ConvertibleInput} ${isCompleted ? styles.isCompleted : null}`}
					>
						{inputValue}
					</button>
				)}
			</div> */}
		</main>
	);
}

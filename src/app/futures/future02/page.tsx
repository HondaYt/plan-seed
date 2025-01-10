"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Future02() {
	const [time, setTime] = useState<number>(300);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [inputMinutes, setInputMinutes] = useState<string>("5");
	const [inputSeconds, setInputSeconds] = useState<string>("00");

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (isRunning && time > 0) {
			intervalId = setInterval(() => {
				setTime((prevTime) => prevTime - 1);
			}, 1000);
		} else if (time === 0) {
			setIsRunning(false);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [isRunning, time]);

	const handleStartStop = () => {
		setIsRunning(!isRunning);
	};

	const handleReset = () => {
		setIsRunning(false);
		const totalSeconds =
			Number.parseInt(inputMinutes) * 60 + Number.parseInt(inputSeconds);
		setTime(totalSeconds);
	};

	const handleTimeChange = (minutes: string, seconds: string) => {
		if (!isRunning) {
			const validMinutes = minutes === "" ? "0" : minutes;
			const validSeconds = seconds === "" ? "0" : seconds;

			setInputMinutes(validMinutes);
			setInputSeconds(validSeconds);

			const totalSeconds =
				Number.parseInt(validMinutes) * 60 + Number.parseInt(validSeconds);
			setTime(totalSeconds);
		}
	};

	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<main className={styles.container}>
			<div className={styles.timer}>
				<h1>タイマー</h1>
				<div className={styles.display}>{formatTime(time)}</div>
				<div className={styles.timeInput}>
					<input
						type="number"
						min="0"
						max="59"
						value={inputMinutes}
						onChange={(e) => handleTimeChange(e.target.value, inputSeconds)}
						disabled={isRunning}
						className={styles.timeField}
					/>
					<span>分</span>
					<input
						type="number"
						min="0"
						max="59"
						value={inputSeconds}
						onChange={(e) => handleTimeChange(inputMinutes, e.target.value)}
						disabled={isRunning}
						className={styles.timeField}
					/>
					<span>秒</span>
				</div>
				<div className={styles.controls}>
					<button type="button" onClick={handleStartStop}>
						{isRunning ? "停止" : "スタート"}
					</button>
					<button type="button" onClick={handleReset}>
						リセット
					</button>
				</div>
			</div>
		</main>
	);
}

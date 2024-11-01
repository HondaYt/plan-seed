"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sec03() {
	const [result, setResult] = useState(0);
	const increment = () => {
		setResult((prev) => prev + 1);
	};
	return (
		<>
			<p>test</p>
		</>
	);
}

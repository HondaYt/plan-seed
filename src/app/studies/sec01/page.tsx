"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sec01() {
	const [result, setResult] = useState(0);
	const increment = () => {
		setResult((prev) => prev + 1);
	};
	return (
		<>
			<p>{result}</p>
			<button type="button" onClick={increment}>
				+
			</button>
			<Link href="/html/sec01/index.html">
				<p>HTML</p>
			</Link>
		</>
	);
}

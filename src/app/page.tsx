import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { LinkBtn } from "@/app/components/Btn/LinkBtn";

export default function Page() {
	return (
		<main className={styles.main}>
			<Image src={"/logo.svg"} height={100} width={500} alt="Plan Seed" />
			<LinkBtn href={"/genre"}>はじめる</LinkBtn>
		</main>
	);
}

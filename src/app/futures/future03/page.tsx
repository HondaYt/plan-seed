"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { initializeApp } from "firebase/app";
import {
	getDatabase,
	ref,
	onValue,
	set,
	onDisconnect,
} from "firebase/database";
import type { Database, DataSnapshot } from "firebase/database";
import type { FirebaseApp } from "firebase/app";

// Firebaseの設定
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebaseのインスタンスを保持する変数
let app: FirebaseApp | undefined;
let db: Database;

// Firebaseの初期化を行う関数
const initializeFirebase = () => {
	if (!app) {
		app = initializeApp(firebaseConfig);
		db = getDatabase(app);
	}
	return db;
};

interface NoteData {
	content: string;
	lastUpdated: string;
}

interface User {
	id: string;
	name: string;
	lastActive: string;
}

export default function Future03() {
	const [text, setText] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [userName, setUserName] = useState("");
	const [isNameInputOpen, setIsNameInputOpen] = useState(true);
	const nameInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isNameInputOpen && nameInputRef.current) {
			nameInputRef.current.focus();
		}
	}, [isNameInputOpen]);

	const handleNameSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (userName.trim()) {
			const database = initializeFirebase();
			const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
			const user: User = {
				id: userId,
				name: userName.trim(),
				lastActive: new Date().toISOString(),
			};
			setCurrentUser(user);
			set(ref(database, `notes/users/${userId}`), user);
			onDisconnect(ref(database, `notes/users/${userId}`)).remove();
			setIsNameInputOpen(false);

			// ノートとユーザーの監視を開始
			initializeNoteAndUserListeners(database, userId);
		}
	};

	const initializeNoteAndUserListeners = (
		database: Database,
		userId: string,
	) => {
		const noteRef = ref(database, "notes/shared");
		const usersRef = ref(database, "notes/users");

		onValue(noteRef, (snapshot: DataSnapshot) => {
			const data = snapshot.val() as NoteData;
			if (data) {
				setText(data.content || "");
			}
		});

		onValue(usersRef, (snapshot: DataSnapshot) => {
			const data = snapshot.val();
			if (data) {
				const activeUsers = Object.values(data) as User[];
				setUsers(activeUsers);
			} else {
				setUsers([]);
			}
		});
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newText = e.target.value;
		setText(newText);

		const database = initializeFirebase();
		set(ref(database, "notes/shared"), {
			content: newText,
			lastUpdated: new Date().toISOString(),
		});

		if (currentUser) {
			set(ref(database, `notes/users/${currentUser.id}`), {
				...currentUser,
				lastActive: new Date().toISOString(),
			});
		}
	};

	return (
		<main className={styles.main}>
			{isNameInputOpen ? (
				<div className={styles.nameInputOverlay}>
					<form onSubmit={handleNameSubmit} className={styles.nameInputForm}>
						<h2>名前を入力してください</h2>
						<input
							ref={nameInputRef}
							type="text"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							placeholder="あなたの名前"
							className={styles.nameInput}
						/>
						<button type="submit" disabled={!userName.trim()}>
							開始
						</button>
					</form>
				</div>
			) : (
				<>
					<h1>共同編集Note</h1>
					<textarea
						value={text}
						onChange={handleTextChange}
						className={styles.editor}
						placeholder="ここにテキストを入力してください..."
					/>
					<div className={styles.userList}>
						<p>現在の編集者: ({users.length}人)</p>
						{users.map((user) => (
							<span
								key={user.id}
								className={
									user.id === currentUser?.id ? styles.currentUser : ""
								}
							>
								{user.name}
							</span>
						))}
					</div>
				</>
			)}
		</main>
	);
}

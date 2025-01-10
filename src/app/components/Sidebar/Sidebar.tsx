import styles from "./Sidebar.module.css";

interface LikedWord {
	id: string;
	word: string;
	timestamp: number;
}

interface SidebarProps {
	likedWords: LikedWord[];
	onUnlike: (id: string) => void;
}

export function Sidebar({ likedWords, onUnlike }: SidebarProps) {
	return (
		<div className={styles.sidebar}>
			<h2>いいねした単語</h2>
			<ul className={styles.wordList}>
				{likedWords.map((word) => (
					<li key={word.id} className={styles.wordItem}>
						<span>{word.word}</span>
						<button
							type="button"
							onClick={() => onUnlike(word.id)}
							className={styles.unlikeButton}
						>
							×
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

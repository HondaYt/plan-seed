"use client";
import styles from "./layout.module.css";
import { useState, useEffect, type ReactNode, createContext } from "react";
import { useSearchParams, usePathname } from "next/navigation";

type State = {
	genre: string;
	keywords: string[];
	concept: string;
	target: {
		ageMin: string;
		ageMax: string;
		gender: string;
		occupation: string;
	};
	scene: {
		when: string;
		where: string;
	};
	features: string[];
	mainFeature: string;
};

export const StateContext = createContext<State>({
	genre: "",
	keywords: [],
	concept: "",
	target: {
		ageMin: "",
		ageMax: "",
		gender: "",
		occupation: "",
	},
	scene: {
		when: "",
		where: "",
	},
	features: [],
	mainFeature: "",
});

export const SidebarContext = createContext<{
	isVisible: boolean;
	setIsVisible: (value: boolean) => void;
}>({
	isVisible: true,
	setIsVisible: () => {},
});

const getGenderLabel = (gender: string): string => {
	switch (gender) {
		case "male":
			return "男性";
		case "female":
			return "女性";
		case "other":
			return "その他";
		default:
			return gender;
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [isOpen, setIsOpen] = useState(true);
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);
	const pathname = usePathname();
	const [state, setState] = useState<State>({
		genre: "",
		keywords: [],
		concept: "",
		target: {
			ageMin: "",
			ageMax: "",
			gender: "",
			occupation: "",
		},
		scene: {
			when: "",
			where: "",
		},
		features: [],
		mainFeature: "",
	});

	const searchParams = useSearchParams();
	const genre = searchParams.get("genre");
	const wordsParam = searchParams.get("words");
	const conceptParam = searchParams.get("concept");
	const ageMin = searchParams.get("ageMin");
	const ageMax = searchParams.get("ageMax");
	const gender = searchParams.get("gender");
	const occupationParam = searchParams.get("occupation");
	const when = searchParams.get("when");
	const where = searchParams.get("where");
	const featuresParam = searchParams.get("features");
	const mainFeatureParam = searchParams.get("mainFeature");

	useEffect(() => {
		setIsSidebarVisible(!pathname.includes("/result"));
	}, [pathname]);

	useEffect(() => {
		setState((prevState) => {
			const newState = { ...prevState };
			let hasChanges = false;

			if (genre && genre !== prevState.genre) {
				newState.genre = genre;
				hasChanges = true;
			}

			if (wordsParam) {
				const words = decodeURIComponent(wordsParam).split(",");
				if (JSON.stringify(words) !== JSON.stringify(prevState.keywords)) {
					newState.keywords = words;
					hasChanges = true;
				}
			}

			if (conceptParam) {
				const concept = decodeURIComponent(conceptParam);
				if (concept !== prevState.concept) {
					newState.concept = concept;
					hasChanges = true;
				}
			}

			if (ageMin || ageMax || gender || occupationParam) {
				const newTarget = {
					ageMin: ageMin || prevState.target.ageMin,
					ageMax: ageMax || prevState.target.ageMax,
					gender: gender || prevState.target.gender,
					occupation: occupationParam
						? decodeURIComponent(occupationParam)
						: prevState.target.occupation,
				};

				if (JSON.stringify(newTarget) !== JSON.stringify(prevState.target)) {
					newState.target = newTarget;
					hasChanges = true;
				}
			}

			if (when || where) {
				const newScene = {
					when: when ? decodeURIComponent(when) : prevState.scene.when,
					where: where ? decodeURIComponent(where) : prevState.scene.where,
				};

				if (JSON.stringify(newScene) !== JSON.stringify(prevState.scene)) {
					newState.scene = newScene;
					hasChanges = true;
				}
			}

			if (featuresParam) {
				const features = decodeURIComponent(featuresParam).split(",");
				if (JSON.stringify(features) !== JSON.stringify(prevState.features)) {
					newState.features = features;
					hasChanges = true;
				}
			}

			if (mainFeatureParam) {
				const mainFeature = decodeURIComponent(mainFeatureParam);
				if (mainFeature !== prevState.mainFeature) {
					newState.mainFeature = mainFeature;
					hasChanges = true;
				}
			}

			return hasChanges ? newState : prevState;
		});
	}, [
		genre,
		wordsParam,
		conceptParam,
		ageMin,
		ageMax,
		gender,
		occupationParam,
		when,
		where,
		featuresParam,
		mainFeatureParam,
	]);

	return (
		<StateContext.Provider value={state}>
			<SidebarContext.Provider
				value={{
					isVisible: isSidebarVisible,
					setIsVisible: setIsSidebarVisible,
				}}
			>
				{isSidebarVisible && (
					<div className={`${styles.sideBar} ${!isOpen ? styles.closed : ""}`}>
						<button
							type="button"
							className={styles.toggleButton}
							onClick={() => setIsOpen(!isOpen)}
							aria-label={isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}
						>
							{isOpen ? "<" : ">"}
						</button>
						<div className={styles.sideBarContent}>
							<h3>現在の選択</h3>
							{state.genre && <p>ジャンル: {state.genre}</p>}
							{state.keywords.length > 0 && (
								<div>
									<p>キーワード:</p>
									<ul className={styles.keywordList}>
										{state.keywords.map((keyword) => (
											<li key={keyword}>{keyword}</li>
										))}
									</ul>
								</div>
							)}
							{state.concept && (
								<div>
									<p>企画コンセプト:</p>
									<p className={styles.concept}>{state.concept}</p>
								</div>
							)}
							{(state.target.ageMin ||
								state.target.ageMax ||
								state.target.gender ||
								state.target.occupation) && (
								<div>
									<p>ターゲット:</p>
									<div className={styles.targetInfo}>
										{(state.target.ageMin || state.target.ageMax) && (
											<p>
												年齢: {state.target.ageMin}歳 〜 {state.target.ageMax}歳
											</p>
										)}
										{state.target.gender && (
											<p>性別: {getGenderLabel(state.target.gender)}</p>
										)}
										{state.target.occupation && (
											<p>職業: {state.target.occupation}</p>
										)}
									</div>
								</div>
							)}
							{(state.scene.when || state.scene.where) && (
								<div>
									<p>使用場面:</p>
									<div className={styles.sceneInfo}>
										{state.scene.when && <p>いつ: {state.scene.when}</p>}
										{state.scene.where && <p>どこで: {state.scene.where}</p>}
									</div>
								</div>
							)}
							{state.features.length > 0 && (
								<div>
									<p>機能一覧:</p>
									<ul className={styles.featureList}>
										{state.features.map((feature) => (
											<li
												key={feature}
												className={
													feature === state.mainFeature
														? styles.mainFeature
														: ""
												}
											>
												{feature}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				)}
				<div
					className={`${styles.mainContent} ${!isOpen || !isSidebarVisible ? styles.expanded : ""}`}
				>
					{children}
				</div>
			</SidebarContext.Provider>
		</StateContext.Provider>
	);
}

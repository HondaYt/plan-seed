import { createContext } from "react";

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

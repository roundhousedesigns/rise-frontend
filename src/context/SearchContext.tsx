import { createContext, useReducer } from 'react';

interface SearchState {
	position: {
		department: string;
		jobs: string[];
	};
	skills: string[];
	results: number[];
}

interface SearchAction {
	type: string;
	payload?: {
		department?: string;
		jobs?: string[];
		skills?: string[];
		results?: number[];
	};
}

const initialSearchState: SearchState = {
	position: {
		department: '',
		jobs: [],
	},
	skills: [],
	results: [],
};

export const SearchContext = createContext({
	search: initialSearchState,
	searchDispatch: ({}: SearchAction) => {},
});

function searchContextReducer(state: SearchState, action: SearchAction): SearchState {
	switch (action.type) {
		case 'SET_DEPARTMENT':
			if (!action.payload?.department) return state;

			return {
				...state,
				position: {
					...state.position,
					department: action.payload.department,
					jobs:
						action.payload.department === state.position.department ? [...state.position.jobs] : [],
				},
			};

		case 'SET_JOBS':
			if (!action.payload?.jobs) return state;

			return {
				...state,
				position: {
					...state.position,
					jobs: action.payload.jobs,
				},
			};

		case 'SET_SKILLS':
			if (!action.payload?.skills) return state;

			return {
				...state,
				skills: action.payload.skills,
			};

		case 'SET_RESULTS':
			if (!action.payload?.results) return state;

			return {
				...state,
				results: action.payload.results,
			};

		case 'RESET':
		default:
			return initialSearchState;
	}
}

interface Props {
	children: React.ReactNode;
}

export const SearchContextProvider = ({ children }: Props) => {
	const [search, searchDispatch] = useReducer(searchContextReducer, initialSearchState);

	return (
		<SearchContext.Provider value={{ search, searchDispatch }}>{children}</SearchContext.Provider>
	);
};

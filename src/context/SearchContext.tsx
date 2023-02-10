import { createContext, useReducer } from 'react';
import { toggleArrayString } from '../lib/utils';

interface SearchState {
	position: {
		department: string;
		jobs: string[];
	};
	skills: string[];
}

interface SearchAction {
	type: string;
	payload?: {
		department?: string;
		jobs?: string[];
		skills?: string[];
	};
}

const initialSearchState: SearchState = {
	position: {
		department: '',
		jobs: [],
	},
	skills: [],
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

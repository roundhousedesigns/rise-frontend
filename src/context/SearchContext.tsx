import { createContext, useReducer } from 'react';

interface SearchState {
	filters: {
		position: {
			department: string;
			jobs: string[];
		};
		skills: string[];
		personal: {
			unions: string[];
		};
	};
	searchActive: boolean;
	results: number[];
}

interface SearchAction {
	type: string;
	payload?: {
		department?: string;
		jobs?: string[];
		skills?: string[];
		results?: number[];
		personal?: {
			filter: string;
			items: string[];
		};
	};
}

const initialSearchState: SearchState = {
	filters: {
		position: {
			department: '',
			jobs: [],
		},
		skills: [],
		personal: {
			unions: [],
		},
	},
	searchActive: false,
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
				filters: {
					...state.filters,
					position: {
						...state.filters.position,
						department: action.payload.department,
						// Clear jobs
						jobs: [],
					},
				},
				searchActive: true,
			};

		case 'SET_JOBS':
			if (!action.payload?.jobs) return state;

			return {
				...state,
				filters: {
					...state.filters,
					position: {
						...state.filters.position,
						jobs: action.payload.jobs,
					},
					// Clear skills
					skills: [],
				},
				searchActive: true,
			};

		case 'SET_SKILLS':
			if (!action.payload?.skills) return state;

			return {
				...state,
				filters: {
					...state.filters,
					skills: action.payload.skills,
				},
				searchActive: true,
			};

		case 'SET_PERSONAL_FILTER':
			if (!action.payload?.personal) return state;

			return {
				...state,
				filters: {
					...state.filters,
					personal: {
						...state.filters.personal,
						[action.payload.personal.filter]: action.payload.personal.items,
					},
				},
			};

		case 'SET_RESULTS':
			if (!action.payload?.results) return state;

			return {
				...state,
				results: action.payload.results,
			};

		case 'RESET_SEARCH_FILTERS':
			return initialSearchState;

		default:
			return state;
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

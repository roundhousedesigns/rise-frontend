import { createContext, Key, useReducer } from 'react';

interface SearchState {
	filters: {
		name: string;
		positions: {
			department: string;
			jobs: string[];
		};
		skills: string[];
		unions: string[];
		locations: string[];
		experienceLevels: string[];
		genderIdentities: string[];
		racialIdentities: string[];
		personalIdentities: string[];
	};
	searchActive: boolean;
	advancedFiltersOpen: boolean;
	searchDrawerClose: () => void;
	results: number[];
}

interface SearchAction {
	type: string;
	payload: {
		name?: string;
		department?: string;
		jobs?: string[];
		skills?: string[];
		locations?: string[];
		filter?: {
			name: string;
			value: string | string[] | Key[];
		};
		results?: number[];
		searchDrawerClose?: () => void;
	};
}

const initialSearchState: SearchState = {
	filters: {
		name: '',
		positions: {
			department: '',
			jobs: [],
		},
		skills: [],
		unions: [],
		locations: [],
		experienceLevels: [],
		genderIdentities: [],
		racialIdentities: [],
		personalIdentities: [],
	},
	searchActive: false,
	advancedFiltersOpen: false,
	searchDrawerClose: () => {},
	results: [],
};

export const SearchContext = createContext({
	search: initialSearchState,
	searchDispatch: ({}: SearchAction) => {},
});

function searchContextReducer(state: SearchState, action: SearchAction): SearchState {
	switch (action.type) {
		case 'OPEN_SEARCH': {
			if (!action.payload?.searchDrawerClose) return state;

			return {
				...state,
				searchDrawerClose: action.payload.searchDrawerClose,
			};
		}

		case 'SET_NAME':
			return {
				...state,
				filters: {
					...initialSearchState.filters,
					name: action.payload.name ? action.payload.name : '',
				},
				searchActive: true,
			};

		case 'SET_DEPARTMENT':
			if (!action.payload?.department) return state;

			return {
				...state,
				filters: {
					...state.filters,
					positions: {
						...state.filters.positions,
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
					positions: {
						...state.filters.positions,
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

		case 'SET_FILTER':
			if (!action.payload?.filter) return state;

			return {
				...state,
				filters: {
					...state.filters,
					[action.payload.filter.name]: action.payload.filter.value,
				},
				searchActive: true,
			};

		case 'SET_RESULTS':
			if (!action.payload?.results) return state;

			return {
				...state,
				results: {
					...action.payload.results
				},
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

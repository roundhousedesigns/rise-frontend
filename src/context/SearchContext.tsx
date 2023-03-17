import { createContext, Key, useReducer } from 'react';

interface SearchState {
	filters: {
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
	results: number[];
}

interface SearchAction {
	type: string;
	payload: {
		department?: string;
		jobs?: string[];
		skills?: string[];
		locations?: string[];
		filter?: {
			name: string;
			value: string | string[] | Key[];
		};
		results?: number[];
	};
}

const initialSearchState: SearchState = {
	filters: {
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

		case 'TOGGLE_ADVANCED_FILTERS_OPEN':
			return {
				...state,
				advancedFiltersOpen: !state.advancedFiltersOpen,
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

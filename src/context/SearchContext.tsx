import { createContext, Key, ReactNode, useReducer } from 'react';

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
	additionalFiltersActive: number[];
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
		filterSet?: any;
		results?: number[];
		additionalFiltersActive?: number[];
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
	additionalFiltersActive: [],
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
				// Clear all other filters and set the main search controls to inactive
				searchActive: false,
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

		case 'SET_ADDITIONAL_FILTERS_ACTIVE':
			if (!action.payload?.additionalFiltersActive) return state;

			return {
				...state,
				additionalFiltersActive: action.payload.additionalFiltersActive,
			};

		case 'RESTORE_FILTER_SET':
			if (!action.payload?.filterSet) return state;

			return {
				...state,
				filters: action.payload.filterSet,
				searchActive: true,
			};

		case 'SET_RESULTS':
			return {
				...state,
				results: action.payload.results || [],
			};

		case 'RESET_SEARCH_FILTERS':
			return initialSearchState;

		default:
			return state;
	}
}

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
	const [search, searchDispatch] = useReducer(searchContextReducer, initialSearchState);

	return (
		<SearchContext.Provider value={{ search, searchDispatch }}>{children}</SearchContext.Provider>
	);
};

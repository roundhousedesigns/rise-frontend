import { createContext, Key, ReactNode, useReducer } from 'react';
import { SearchFilterSet, SearchResultCandidate } from '@lib/types';
import { additionalFilterKeys } from '@lib/utils';

interface SearchState {
	filters: {
		name: string;
		filterSet: SearchFilterSet;
	};
	searchActive: boolean;
	additionalFiltersActive: number[];
	results: SearchResultCandidate[];
}

interface SearchAction {
	type: string;
	payload: {
		name?: string;
		departments?: string[];
		jobs?: string[];
		skills?: string[];
		locations?: string[];
		filter?: {
			name: string;
			value: string | string[] | Key[];
		};
		filterSet?: SearchFilterSet;
		results?: SearchResultCandidate[];
		additionalFiltersActive?: number[];
	};
}

const initialSearchState: SearchState = {
	filters: {
		name: '',
		filterSet: {
			positions: {
				departments: [],
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
	},
	searchActive: false,
	additionalFiltersActive: [],
	results: [],
};

export const SearchContext = createContext({
	search: initialSearchState,
	searchDispatch: ({}: SearchAction) => {},
});

function searchContextReducer(state: SearchState, action: SearchAction): SearchState {
	switch (action.type) {
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
			if (!action.payload?.departments) return state;

			return {
				...state,
				filters: {
					...state.filters,
					filterSet: {
						...state.filters.filterSet,
						positions: {
							departments: action.payload.departments,
							// Clear jobs
							jobs: [],
						},
						// Clear skills
						skills: [],
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
					filterSet: {
						...state.filters.filterSet,
						positions: {
							...state.filters.filterSet.positions,
							jobs: action.payload.jobs,
						},
					},
				},
				searchActive: true,
			};

		case 'SET_SKILLS':
			if (!action.payload?.skills) return state;

			return {
				...state,
				filters: {
					...state.filters,
					filterSet: {
						...state.filters.filterSet,
						skills: action.payload.skills,
					},
				},
				searchActive: true,
			};

		case 'SET_FILTER':
			if (!action.payload?.filter) return state;

			return {
				...state,
				filters: {
					...state.filters,
					filterSet: {
						...state.filters.filterSet,
						[action.payload.filter.name]: action.payload.filter.value,
					},
				},
				searchActive: true,
			};

		case 'SET_ADDITIONAL_FILTERS_ACTIVE':
			if (!action.payload?.additionalFiltersActive) return state;

			return {
				...state,
				additionalFiltersActive: action.payload.additionalFiltersActive,
			};

		case 'RESTORE_FILTER_SET': {
			const {
				payload: { filterSet },
			} = action;

			if (!filterSet) return state;

			const filterIndexes: number[] = [];

			additionalFilterKeys.forEach((key: string, index: number) => {
				if (!!filterSet[key] && filterSet[key].length) filterIndexes.push(index);
			});

			return {
				...state,
				filters: {
					...state.filters,
					filterSet,
				},
				searchActive: true,
				additionalFiltersActive: filterIndexes.length ? filterIndexes : [],
			};
		}

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

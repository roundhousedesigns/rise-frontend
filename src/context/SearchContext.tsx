import { createContext, ReactNode, useReducer } from 'react';
import { SearchFilterSet } from '@lib/classes';
import { SearchResultCandidate } from '@lib/types';
import { additionalFilterKeys } from '@lib/utils';

interface SearchState {
	filters: {
		name: string;
		filterSet: SearchFilterSet;
	};
	searchWizardActive: boolean;
	additionalFiltersActive: number[];
	savedSearch: {
		id: number;
		filterSet: SearchFilterSet;
	};
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
			key: string;
			value: any;
		};
		searchWizardActive?: boolean;
		filterSet?: SearchFilterSet;
		savedSearchId?: number;
		results?: SearchResultCandidate[];
		additionalFiltersActive?: number[];
	};
}

/**
 * Returns the initial state for the search context.
 *
 * @return {SearchState} The initial search state with default values for filters, search activity, active filters, saved search, and results.
 */
const getInitialSearchState = (): SearchState => ({
	filters: {
		name: '',
		filterSet: new SearchFilterSet(),
	},
	searchWizardActive: false,
	additionalFiltersActive: [],
	savedSearch: {
		id: 0,
		filterSet: new SearchFilterSet(),
	},
	results: [],
});

export const SearchContext = createContext({
	search: getInitialSearchState(),
	searchDispatch: ({}: SearchAction) => {},
});

function searchContextReducer(state: SearchState, action: SearchAction): SearchState {
	switch (action.type) {
		case 'SET_NAME':
			return {
				...state,
				filters: {
					...getInitialSearchState().filters,
					name: action.payload.name ? action.payload.name : '',
				},
				// Clear all other filters and set the main search controls to inactive
				searchWizardActive: false,
			};

		case 'SET_DEPARTMENTS': {
			if (!action.payload?.departments) return state;

			const filterSet = new SearchFilterSet(state.filters.filterSet);
			filterSet.setDepartments(action.payload.departments);

			return {
				...state,
				filters: {
					...state.filters,
					filterSet,
				},
				searchWizardActive: true,
			};
		}

		case 'SET_JOBS': {
			if (!action.payload?.jobs) return state;

			const filterSet = new SearchFilterSet(state.filters.filterSet);
			filterSet.setJobs(action.payload.jobs);

			return {
				...state,
				filters: {
					...state.filters,
					filterSet,
				},
				searchWizardActive: true,
			};
		}

		case 'SET_POSITIONS': {
			if (!action.payload?.departments || !action.payload?.jobs) return state;

			const filterSet = new SearchFilterSet(state.filters.filterSet);
			filterSet.setDepartments(action.payload.departments);
			filterSet.setJobs(action.payload.jobs);

			return {
				...state,
				filters: {
					...state.filters,
					filterSet,
				},
				searchWizardActive: true,
			};
		}

		case 'SET_FILTER': {
			if (!action.payload?.filter) return state;
			const { key, value } = action.payload.filter;

			const filterSet = new SearchFilterSet(state.filters.filterSet);
			filterSet.set(key, value);

			return {
				...state,
				filters: {
					...state.filters,
					filterSet,
				},
				searchWizardActive: true,
			};
		}

		case 'SET_ADDITIONAL_FILTERS_ACTIVE': {
			if (!action.payload?.additionalFiltersActive) return state;

			return {
				...state,
				additionalFiltersActive: action.payload.additionalFiltersActive,
			};
		}

		case 'SET_SAVED_SEARCH_FILTERS': {
			const {
				payload: { filterSet, savedSearchId },
			} = action;

			if (!filterSet) return state;

			return {
				...state,
				filters: {
					...state.filters,
					filterSet,
				},
				searchWizardActive: true,
				savedSearch: {
					id: savedSearchId ? savedSearchId : 0,
					filterSet,
				},
			};
		}

		case 'RESTORE_SAVED_SEARCH': {
			const {
				payload: { filterSet, savedSearchId },
			} = action;

			if (!filterSet || !savedSearchId) return state;

			const filterIndexes: number[] = [];

			additionalFilterKeys.forEach((key: string, index: number) => {
				if (!!filterSet[key] && filterSet[key].length) filterIndexes.push(index);
			});

			return {
				...state,
				filters: {
					...state.filters,
					name: '',
					filterSet,
				},
				searchWizardActive: true,
				additionalFiltersActive: filterIndexes.length ? filterIndexes : [],
				savedSearch: {
					id: savedSearchId,
					filterSet,
				},
			};
		}

		case 'SET_RESULTS':
			return {
				...state,
				results: action.payload.results || [],
			};

		case 'RESET_SEARCH_FILTERS':
			return getInitialSearchState();

		default:
			return state;
	}
}

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
	const [search, searchDispatch] = useReducer(searchContextReducer, getInitialSearchState());

	return (
		<SearchContext.Provider value={{ search, searchDispatch }}>{children}</SearchContext.Provider>
	);
};

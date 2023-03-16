/**
 * useCandidateSearch hook. Query candidates (users) based on selected search parameters.
 *
 * // TODO Document me.
 */

import { gql, LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';

export const QUERY_CANDIDATES = gql`
	query FilteredCandidates($skills: [ID] = [], $jobs: [ID] = [], $exclude: [ID] = []) {
		filteredCandidates(skills: $skills, jobs: $jobs, exclude: $exclude)
	}
`;

/**
 * useCandidateSearch hook.
 *
 * Queries candidates (users) based on selected search parameters.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
export const useCandidateSearch = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_CANDIDATES);
};

/**
 * useCandidateSearch hook. Query candidates (users) based on selected search parameters.
 *
 * // TODO Document me.
 */

import { gql, useLazyQuery } from '@apollo/client';

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
 * @param {SearchParams} filters The search parameters.
 * @returns {LazyQueryResultTuple} The query result and the filters.
 */
export const useCandidateSearch = () => {
	return useLazyQuery(QUERY_CANDIDATES);
};

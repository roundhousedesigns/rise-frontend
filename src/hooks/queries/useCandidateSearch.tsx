/**
 * useCandidateSearch hook. Query candidates (users) based on selected search parameters.
 *
 * // TODO Document me.
 */

import { gql, useQuery } from '@apollo/client';
import { SearchParams } from '../../lib/types';

const QUERY_CANDIDATES = gql`
	query FilteredCandidates($skills: [ID] = [], $jobs: [ID] = "") {
		filteredCandidates(skills: $skills, jobs: $jobs)
	}
`;

/**
 * useCandidateSearch hook.
 *
 * Queries candidates (users) based on selected search parameters.
 *
 * @param {SearchParams} filters The search parameters.
 * @returns {object} The query result and the filters.
 */
export const useCandidateSearch = (filters: SearchParams) => {
	const {
		position: { jobs },
		skills,
	} = filters;

	const result = useQuery(QUERY_CANDIDATES, {
		variables: {
			jobs: jobs && jobs.length > 0 ? jobs : [],
			skills: skills && skills.length > 0 ? skills : [],
		},
	});

	return result;
};

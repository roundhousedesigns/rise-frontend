/**
 * useCandidateSearch hook.
 *
 * // TODO Document me.
 */

import { gql, useQuery } from '@apollo/client';
import { SearchParams } from '../../lib/types';

const QUERY_CANDIDATES = gql`
	query FilteredCandidates($skills: [ID] = []) {
		filteredCandidates(skills: $skills)
	}
`;

/**
 * useCandidateSearch hook.
 *
 * Queries `skill` terms related to a department and/or job (`department` taxonomy)
 *
 * @param {Array} skills - An array of skill IDs.
 *
 * @returns {object} The query result object.
 */
export const useCandidateSearch = (filters: SearchParams) => {
	const result = useQuery(QUERY_CANDIDATES, {
		variables: {
			department: filters.department,
			jobs: filters.jobs && filters.jobs.length > 0 ? filters.jobs : [],
			skills: filters.skills && filters.skills.length > 0 ? filters.skills : [],
		},
	});

	return result;
};

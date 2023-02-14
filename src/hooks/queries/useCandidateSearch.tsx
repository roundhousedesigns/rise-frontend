/**
 * useCandidateSearch hook. Query candidates (users) based on selected search parameters.
 *
 * // TODO Document me.
 */

import { gql, useQuery } from '@apollo/client';
import { SearchParams } from '../../lib/types';

const QUERY_CANDIDATES = gql`
	query FilteredCandidates($skills: [ID] = [], $department: String = "", $jobs: [ID] = "") {
		filteredCandidates(skills: $skills, department: $department, jobs: $jobs)
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
		position: { department, jobs },
		skills,
	} = filters;

	return useQuery(QUERY_CANDIDATES, {
		variables: {
			department: department ? department : '',
			jobs: jobs && jobs.length > 0 ? jobs : [],
			skills: skills && skills.length > 0 ? skills : [],
		},
	});
};

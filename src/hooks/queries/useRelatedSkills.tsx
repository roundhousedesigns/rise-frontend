/**
 * useRelatedSkills hook.
 *
 * // TODO Document me.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_RELATED_SKILLS = gql`
	query RelatedSkillsQuery($jobs: [ID!]) {
		jobSkills(jobs: $jobs) {
			name
			slug
			id: databaseId
		}
	}
`;

/**
 * usePositions hook.
 *
 * Queries `skill` terms related to a job (`position` taxonomy)
 *
 * @param {Array} jobs - An array of job IDs.
 *
 * @returns {object} The query result object.
 */
export const useRelatedSkills = (jobs: string[] = []) => {
	const result = useQuery(QUERY_RELATED_SKILLS, {
		variables: {
			jobs,
		},
	});

	return result;
};

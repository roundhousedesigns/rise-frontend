/**
 * useRelatedSkills hook.
 *
 * // TODO Document me.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_RELATED_SKILLS = gql`
	query RelatedSkillsQuery($department: String, $jobs: [ID!]) {
		jobSkills(department: $department, jobs: $jobs) {
			name
			slug
			id: databaseId
		}
	}
`;

/**
 * usePositions hook.
 *
 * Queries `skill` terms related to a department and/or job (`department` taxonomy)
 *
 * @param {string} department - An array of department IDs.
 * @param {Array} jobs - An array of job IDs.
 *
 * @returns {object} The query result object.
 */
export const useRelatedSkills = (department: string = '', jobs: string[] = []) => {
	const result = useQuery(QUERY_RELATED_SKILLS, {
		variables: {
			department,
			jobs,
		},
	});

	return result;
};

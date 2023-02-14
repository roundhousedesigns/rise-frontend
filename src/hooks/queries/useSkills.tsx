/**
 * useSkills hook.
 *
 * // TODO DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_SKILLS = gql`
	query SkillsQuery($exclude: [ID!], $page: Int) {
		skills(exclude: $exclude, page: $page) {
			name
			slug
			id: databaseId
		}
	}
`;

/**
 * usePositions hook.
 *
 * Queries `skill` terms.
 *
 * @param {Array} exclude - An array of departments to exclude.
 *
 * @returns {object} The query result object.
 */
export const useRelatedSkills = (exclude: string[] = [], page: number = 0) => {
	const result = useQuery(QUERY_SKILLS, {
		variables: {
			exclude,
			page,
		},
	});

	return result;
};

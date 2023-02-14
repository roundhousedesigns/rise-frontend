/**
 * useUsersWithSkills hook.
 *
 * // TODO Document me.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_USERS_WITH_SKILLS = gql`
	query UsersWithSkills($skills: [ID] = []) {
		usersWithSkills(skills: $skills)
	}
`;

/**
 * usePositions hook.
 *
 * Queries `skill` terms related to a department and/or job (`department` taxonomy)
 *
 * @param {Array} skills - An array of skill IDs.
 *
 * @returns {object} The query result object.
 */
export const useUsersWithSkills = (skills: string[] = []) => {
	const result = useQuery(QUERY_USERS_WITH_SKILLS, {
		variables: {
			skills,
		},
	});

	return result;
};

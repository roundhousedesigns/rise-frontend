/**
 * Test queries
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_USERS = gql`
	query UsersTest {
		users(where: { role: CREW_MEMBER }) {
			nodes {
				databaseId
				firstName
				lastName
				pronouns
			}
		}
	}
`;

/**
 * useTestUsers hook.
 *
 * Queries the latest `credit` items.
 *
 * @returns {object} The query result object.
 */
export const useTestUsers = () => {
	const result = useQuery(QUERY_USERS);

	return result;
};

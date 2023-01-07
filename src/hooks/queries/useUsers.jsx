/**
 * useUsers hook. Query to retrieve Users.
 */

import { gql, useQuery } from "@apollo/client";

export const QUERY_USERS = gql`
	query AllUsersQuery {
		users {
			nodes {
				userBasic {
					middlename
				}
				firstName
				lastName
			}
		}
	}
`;

export const useAllUsers = () => {
	const result = useQuery(QUERY_USERS);

	return result;
};

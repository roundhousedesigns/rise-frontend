/**
 * useUsers hook. Query to retrieve Users.
 */

import { gql, useQuery } from "@apollo/client";

export const QUERY_USERS = gql`
	query QueryUsersByRole($role: UserRoleEnum = ADMINISTRATOR) {
		users(where: { role: $role }) {
			nodes {
				firstName
				lastName
			}
		}
	}
`;

export const useAllUsers = () => {
	const result = useQuery(QUERY_USERS, {
		variables: {
			role: "CREW_MEMBER",
		},
	});

	return result;
};

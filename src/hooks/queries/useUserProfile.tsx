/**
 * useUserProfile hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_USER = gql`
	query UserQuery($id: ID = "") {
		user(id: $id, idType: DATABASE_ID) {
			id: databaseId
			firstName
			lastName
			selftitle(format: RENDERED)
			imageConnection: image {
				node {
					mediaItemUrl
				}
			}
			pronouns
			phone(format: RENDERED)
			description
			url
			location
			resume {
				node {
					link
				}
			}
			willTravel
			media
			unions
			education
			twitter
			instagram
			linkedin
			facebook
		}
	}
`;

export const useUserProfile = (id: string) => {
	const results = useQuery(QUERY_USER, {
		variables: {
			id,
		},
	});

	return results;
};

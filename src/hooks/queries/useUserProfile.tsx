/**
 * useUserProfile hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_USER = gql`
	query UserQuery($last: Int = 5, $id: ID = 2, $author: Int = 2) {
		user(id: $id, idType: DATABASE_ID) {
			id: databaseId
			lastName
			contactEmail
			selfTitle
			image
			pronouns
			phone
			description
			websiteUrl
			location
			resume
			willTravel
			media
			unions
			education
			twitter
			instagram
			linkedin
			facebook
			firstName
		}
		credits(where: { author: $author }, last: $last) {
			nodes {
				databaseId
				venue(format: RENDERED)
				year
				departments {
					nodes {
						name
						slug
					}
				}
				title(format: RENDERED)
			}
		}
	}
`;

// FIXME $author not used
export const useUserProfile = (id: number) => {
	const results = useQuery(QUERY_USER, {
		variables: {
			id,
			author: id,
			last: 5,
		},
	});

	return results;
};

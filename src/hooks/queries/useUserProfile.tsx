/**
 * useUserProfile hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_USER = gql`
	query UserQuery($lastCredits: Int = 5, $id: ID!, $author: Int!) {
		user(id: $id, idType: DATABASE_ID) {
			id: databaseId
			firstName
			lastName
			email: contactEmail
			selfTitle
			image
			pronouns
			phone
			description
			website: websiteUrl
			location
			resume
			willTravel
			media
			education
			twitter
			instagram
			linkedin
			facebook
			unions {
				id: databaseId
				name
				slug
			}
		}
		credits(where: { author: $author }, last: $lastCredits) {
			nodes {
				id: databaseId
				title(format: RENDERED)
				venue(format: RENDERED)
				year(format: RENDERED)
				positions {
					nodes {
						id: databaseId
						name
						slug
					}
				}
				skills {
					nodes {
						id: databaseId
						name
						slug
					}
				}
			}
		}
	}
`;

// FIXME $author not used?
export const useUserProfile = (id: number) => {
	const result = useQuery(QUERY_USER, {
		variables: {
			id,
			author: Number(id),
			last: 5,
		},
	});

	return result;
};

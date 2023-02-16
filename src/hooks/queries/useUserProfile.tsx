/**
 * useUserProfile hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';
import { Credit, UserProfile } from '../../lib/classes';
import { CreditParams } from '../../lib/types';

const QUERY_USER = gql`
	query UserQuery($last: Int = 5, $id: ID!, $author: Int!) {
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
				title(format: RENDERED)
				venue(format: RENDERED)
				year(format: RENDERED)
				positions {
					nodes {
						name
						slug
					}
				}
				skills {
					nodes {
						name
						slug
					}
				}
			}
		}
	}
`;

// FIXME $author not used
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

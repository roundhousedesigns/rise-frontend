/**
 * useUserProfile hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { CreditParams } from '../../lib/types';
import { Credit, UserProfile } from '../../lib/classes';
import useTaxonomyTerm from './useTaxonomyTerm';

export const QUERY_PROFILE = gql`
	query UserQuery($lastCredits: Int = 5, $id: ID!, $author: Int!) {
		user(id: $id, idType: DATABASE_ID) {
			id: databaseId
			firstName
			lastName
			pronouns
			email: contactEmail
			selfTitle
			image
			phone
			description
			location
			resume
			willTravel
			media
			education
			website: websiteUrl
			twitter
			instagram
			linkedin
			facebook
			unions {
				id: databaseId
			}
			genderIdentities {
				id: databaseId
			}
			racialIdentities {
				id: databaseId
			}
			personalIdentities {
				id: databaseId
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
						parentId: parentDatabaseId
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
/**
 * Query to retrieve one User by database ID.
 *
 * @param id User ID
 * @returns A tuple of a prepared data object and a query result object.
 */
export const useUserProfile = (id: number): [UserProfile | null, any] => {
	const result = useQuery(QUERY_PROFILE, {
		variables: {
			id,
			author: Number(id),
			last: 5,
		},
	});

	const credits = result.data?.credits.nodes.map((credit: CreditParams) => new Credit(credit));
	const preparedProfile = result.data ? new UserProfile(result.data.user, credits) : null;

	return [preparedProfile, omit(result, ['data'])];
};

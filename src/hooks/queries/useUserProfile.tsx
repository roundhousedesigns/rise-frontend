/**
 * useUserProfile hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { Credit, UserProfile, WPItem } from '../../lib/classes';

export const QUERY_PROFILE = gql`
	query UserQuery($lastCredits: Int = 5, $id: ID!, $author: Int!) {
		user(id: $id, idType: DATABASE_ID) {
			id: databaseId
			firstName
			lastName
			pronouns
			email
			selfTitle
			image
			phone
			description
			resume
			willTravel
			media
			education
			website: websiteUrl
			twitter
			instagram
			linkedin
			facebook
			locations {
				id: databaseId
			}
			unions {
				id: databaseId
			}
			experienceLevels {
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
						parentId: parentDatabaseId
					}
				}
				skills {
					nodes {
						id: databaseId
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
		fetchPolicy: 'network-only',
	});

	const credits = result.data?.credits.nodes.map((credit: { [key: string]: any }) => {
		return new Credit({
			id: credit.id,
			title: credit.title,
			venue: credit.venue,
			year: credit.year,
			department: credit.positions?.nodes[0]?.parentId,
			jobs: [...credit.positions?.nodes?.map((job: WPItem) => job.id)],
			skills: [...credit.skills?.nodes?.map((skill: WPItem) => skill.id)],
		});
	});
	const preparedProfile = result.data ? new UserProfile(result.data.user, credits) : null;

	return [preparedProfile, omit(result, ['data'])];
};

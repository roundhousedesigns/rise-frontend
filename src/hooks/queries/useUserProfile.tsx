/**
 * useUserProfile hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { UserProfile } from '@lib/classes';
import { prepareCreditsFromGQLNodes, sortCreditsByIndex } from '@/lib/utils';

export const QUERY_PROFILE = gql`
	query UserQuery($id: ID!, $author: Int!, $lastCredits: Int = 5) {
		user(id: $id, idType: DATABASE_ID) {
			id: databaseId
			firstName
			lastName
			pronouns
			email: contactEmail
			selfTitle
			homebase
			image
			phone
			description
			resume
			willTravel
			willTour
			education
			twitter
			instagram
			linkedin
			facebook
			website: websiteUrl
			unavailable
			locations {
				id: databaseId
			}
			unions {
				id: databaseId
			}
			partnerDirectories {
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
			mediaVideo1(format: RAW)
			mediaVideo2(format: RAW)
			mediaImage1(format: RAW)
			mediaImage2(format: RAW)
			mediaImage3(format: RAW)
			mediaImage4(format: RAW)
			mediaImage5(format: RAW)
			mediaImage6(format: RAW)
		}
		credits(where: { author: $author }, last: $lastCredits) {
			nodes {
				id: databaseId
				index
				title(format: RENDERED)
				jobTitle(format: RENDERED)
				jobLocation(format: RENDERED)
				venue(format: RENDERED)
				workStart(format: RENDERED)
				workEnd(format: RENDERED)
				workCurrent
				intern
				fellow
				positions(first: 50) {
					nodes {
						id: databaseId
						parentId: parentDatabaseId
					}
				}
				skills(first: 50) {
					nodes {
						id: databaseId
					}
				}
			}
		}
	}
`;

/**
 * Query to retrieve one User by database ID.
 *
 * @param id User ID
 * @returns A tuple of a prepared data object and a query result object.
 */
const useUserProfile = (id: number, count?: number): [UserProfile | null, any] => {
	const result = useQuery(QUERY_PROFILE, {
		variables: {
			id,
			author: id,
			last: count,
		},
		fetchPolicy: 'cache-and-network',
	});

	const credits = result.data?.credits.nodes
		? prepareCreditsFromGQLNodes(result.data.credits.nodes)
		: [];

	// Reorder the credits
	if (credits) sortCreditsByIndex(credits);

	// Prepare the profile data object.
	const preparedProfile = result.data ? new UserProfile(result.data.user, credits) : null;

	return [preparedProfile, omit(result, ['data'])];
};

export default useUserProfile;

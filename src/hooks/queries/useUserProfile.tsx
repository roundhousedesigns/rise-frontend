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
				year(format: RENDERED)
				workStart(format: RENDERED)
				workEnd(format: RENDERED)
				workCurrent
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

	// Prepare the credits data object.
	const credits = result.data?.credits.nodes.map((credit: { [key: string]: any }) => {
		// If credit at least has an id and a title, return a new Credit object
		if (!credit.id || !credit.title) return null;

		return new Credit({
			id: credit.id,
			index: credit.index,
			title: credit.title,
			jobTitle: credit.jobTitle,
			jobLocation: credit.jobLocation,
			venue: credit.venue,
			year: credit.year,
			workStart: credit.workStart,
			workEnd: credit.workEnd,
			workCurrent: credit.workCurrent,
			department: credit.positions?.nodes.map((job: WPItem) => job.parentId),
			jobs: credit.positions?.nodes.map((job: WPItem) => job.id),
			skills: credit.skills?.nodes.map((skill: WPItem) => skill.id),
		});
	});

	// Reorder the credits
	if (credits) credits.sort((a: Credit, b: Credit) => Number(a.index) - Number(b.index));

	// Prepare the profile data object.
	const preparedProfile = result.data ? new UserProfile(result.data.user, credits) : null;

	return [preparedProfile, omit(result, ['data'])];
};

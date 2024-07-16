/**
 * useViewer hook. Query information about the current logged in user.
 */

import { QueryResult, gql, useQuery } from '@apollo/client';

export const QUERY_VIEWER = gql`
	query QueryViewer {
		viewer {
			id: databaseId
			slug
			firstName
			lastName
			email
			username
			disableProfile
			starredProfiles(first: 100) {
				nodes {
					databaseId
				}
			}
		}
	}
`;

interface Props {
	loggedInId: number;
	loggedInSlug: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	disableProfile: boolean;
	result: QueryResult;
	starredProfiles?: number[];
}

const useViewer = (): Props => {
	const result = useQuery(QUERY_VIEWER);

	const {
		id: loggedInId,
		slug: loggedInSlug,
		firstName,
		lastName,
		email,
		username,
		disableProfile,
		starredProfiles: starredProfilesRaw,
	} = result?.data?.viewer || {};

	const starredProfiles =
		starredProfilesRaw?.nodes?.map((node: { databaseId: number }) => node.databaseId) || undefined;

	return {
		loggedInId,
		loggedInSlug,
		firstName,
		lastName,
		email,
		username,
		disableProfile,
		starredProfiles,
		result,
	};
};

export default useViewer;

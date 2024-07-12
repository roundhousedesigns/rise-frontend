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
			starredProfileConnections(first: 100) {
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
	starredProfiles: number[];
}

const useViewer = (): Props => {
	const result = useQuery(QUERY_VIEWER, {
		fetchPolicy: 'cache-and-network',
	});

	const {
		id: loggedInId,
		slug: loggedInSlug,
		firstName,
		lastName,
		email,
		username,
		disableProfile,
		starredProfileConnections,
	} = result?.data?.viewer || {};

	const starredProfiles =
		starredProfileConnections?.nodes.map((node: { databaseId: number }) => node.databaseId) ||
		[];

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

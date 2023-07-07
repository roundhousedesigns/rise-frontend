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
			starredProfileConnections {
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
	result: QueryResult;
	starredProfiles: number[];
}

const useViewer = (): Props => {
	const result = useQuery(QUERY_VIEWER, {
		// fetchPolicy: 'network-only',
	});

	const {
		id: loggedInId,
		slug: loggedInSlug,
		firstName,
		lastName,
		email,
		starredProfileConnections,
	} = result?.data?.viewer || {};

	const starredProfiles =
		starredProfileConnections?.nodes.map((node: { databaseId: number }) => node.databaseId) || [];

	return {
		loggedInId,
		loggedInSlug,
		firstName,
		lastName,
		email,
		starredProfiles,
		result,
	};
};

export default useViewer;

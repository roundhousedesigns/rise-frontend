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
			hideProfile
			bookmarkedProfileConnections(first: 50) {
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
	hideProfile: boolean;
	result: QueryResult;
	bookmarkedProfiles: number[];
}

const useViewer = (): Props => {
	const result = useQuery(QUERY_VIEWER);

	const {
		id: loggedInId,
		slug: loggedInSlug,
		firstName,
		lastName,
		email,
		hideProfile,
		bookmarkedProfileConnections,
	} = result?.data?.viewer || {};

	const bookmarkedProfiles =
		bookmarkedProfileConnections?.nodes.map((node: { databaseId: number }) => node.databaseId) ||
		[];

	return {
		loggedInId,
		loggedInSlug,
		firstName,
		lastName,
		email,
		hideProfile,
		bookmarkedProfiles,
		result,
	};
};

export default useViewer;

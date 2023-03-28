/**
 * useViewer hook. Query information about the current logged in user.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_VIEWER = gql`
	query QueryViewer {
		viewer {
			id: databaseId
		}
	}
`;

export const useViewer = (): { result: any; loggedInId: number } => {
	const result = useQuery(QUERY_VIEWER, {
		fetchPolicy: 'network-only',
	});

	const loggedInId = result.data?.viewer?.id;

	return { result, loggedInId };
};

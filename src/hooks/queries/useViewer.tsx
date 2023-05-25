/**
 * useViewer hook. Query information about the current logged in user.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_VIEWER = gql`
	query QueryViewer {
		viewer {
			id: databaseId
			firstName
			lastName
		}
	}
`;

interface ViewerProps {
	result: any;
	loggedInId: number;
	firstName: string;
	lastName: string;
}

export const useViewer = (): ViewerProps => {
	const result = useQuery(QUERY_VIEWER, {
		// fetchPolicy: 'network-only',
	});

	const loggedInId = result?.data?.viewer?.id;
	const firstName = result?.data?.viewer?.firstName;
	const lastName = result?.data?.viewer?.lastName;

	return { result, loggedInId, firstName, lastName };
};

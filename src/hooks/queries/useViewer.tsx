/**
 * useViewer hook. Query information about the current logged in user.
 */

import { QueryResult, gql, useQuery } from '@apollo/client';

const QUERY_VIEWER = gql`
	query QueryViewer {
		viewer {
			id: databaseId
			firstName
			lastName
			email
		}
	}
`;

interface Props {
	loggedInId: number;
	firstName: string;
	lastName: string;
	email: string;
	result: QueryResult;
}

const useViewer = (): Props => {
	const result = useQuery(QUERY_VIEWER, {
		// fetchPolicy: 'network-only',
	});

	const loggedInId = result?.data?.viewer?.id;
	const firstName = result?.data?.viewer?.firstName;
	const lastName = result?.data?.viewer?.lastName;
	const email = result?.data?.viewer?.email;

	return { loggedInId, firstName, lastName, email, result };
};

export default useViewer;

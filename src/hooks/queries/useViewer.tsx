/**
 * useViewer hook. Query information about the current logged in user.
 */

import { QueryResult, gql, useQuery } from '@apollo/client';

const QUERY_VIEWER = gql`
	query QueryViewer {
		viewer {
			id: databaseId
			slug
			firstName
			lastName
			email
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
}

const useViewer = (): Props => {
	const result = useQuery(QUERY_VIEWER, {
		// fetchPolicy: 'network-only',
	});

	const loggedInId = result?.data?.viewer?.id;
	const loggedInSlug = result?.data?.viewer?.slug;
	const firstName = result?.data?.viewer?.firstName;
	const lastName = result?.data?.viewer?.lastName;
	const email = result?.data?.viewer?.email;

	return { loggedInId, loggedInSlug, firstName, lastName, email, result };
};

export default useViewer;

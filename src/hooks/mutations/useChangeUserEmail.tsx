import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '@queries/useViewer';

// Define the GraphQL mutation for changing the user's email
const MUTATE_CHANGE_USER_EMAIL = gql`
	mutation ChangeEmail($newEmail: String!, $password: String!, $username: String!) {
		changeEmail(input: { newEmail: $newEmail, password: $password, username: $username }) {
			clientMutationId
			success
		}
	}
`;

// Define the hook for changing the user's email
const useChangeUserEmail = () => {
	const [mutation, results] = useMutation(MUTATE_CHANGE_USER_EMAIL);

	// Function to perform the mutation
	const changeUserEmailMutation = (username: string, newEmail: string, password: string) => {
		return mutation({
			variables: {
				clientMutationId: 'changeUserEmailMutation',
				username,
				newEmail,
				password,
			},
			refetchQueries: [{ query: QUERY_VIEWER, fetchPolicy: 'network-only' }],
		});
	};

	return { changeUserEmailMutation, results };
};

export default useChangeUserEmail;

/**
 * useSendPasswordResetEmail hook. Mutation to send the user a password reset email.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_SEND_PASSWORD_RESET = gql`
	mutation SendPasswordResetEmail($username: String!) {
		sendPasswordResetEmail(input: { username: $username }) {
			clientMutationId
			user {
				databaseId
				email
			}
		}
	}
`;

export const useSendPasswordResetEmail = () => {
	const [mutation, results] = useMutation(MUTATE_SEND_PASSWORD_RESET);

	const sendPasswordResetEmailMutation = (username: string) => {
		return mutation({
			variables: {
				clientMutationId: 'sendPasswordResetEmailMutation',
				username,
			},
		});
	};

	return { sendPasswordResetEmailMutation, results };
};

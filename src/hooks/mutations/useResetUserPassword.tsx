/**
 * useResetUserPassword hook. Mutation to reset a user's password.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_RESET_USER_PASSWORD = gql`
	mutation ResetUserPassword($key: String!, $password: String!, $login: String!) {
		resetUserPassword(
			input: { key: $key, password: $password, login: $login, clientMutationId: "" }
		) {
			clientMutationId
			user {
				id
			}
		}
	}
`;

interface PasswordResetInput {
	key: string;
	login: string;
	password: string;
}

export const useResetUserPassword = () => {
	const [mutation, results] = useMutation(MUTATE_RESET_USER_PASSWORD);

	const resetUserPasswordMutation = ({ key, login, password }: PasswordResetInput) => {
		return mutation({
			variables: {
				clientMutationId: 'resetUserPasswordMutation',
				key,
				login,
				password,
			},
		});
	};

	return { resetUserPasswordMutation, results };
};

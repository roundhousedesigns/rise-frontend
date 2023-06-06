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

const useResetUserPassword = () => {
	const [mutation, results] = useMutation(MUTATE_RESET_USER_PASSWORD);

	const resetUserPasswordMutation = (key: string, login: string, password: string) => {
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

export default useResetUserPassword;

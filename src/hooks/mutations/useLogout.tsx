/**
 * useLogout hook. Mutation to log the user out.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_LOGOUT = gql`
	mutation Logout($input: LogoutInput = {}) {
		logout(input: $input) {
			clientMutationId
			status
		}
	}
`;

export const useLogout = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_LOGOUT);

	const logoutMutation = () => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'loginMutation',
				},
			},
		});
	};

	return { logoutMutation, results: mutationResults };
};

/**
 * useLogout hook. Mutation to log the user out.
 *
 * @deprecated JWTs are now used for authentication.
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
	const [mutation, results] = useMutation(MUTATE_LOGOUT);

	const logoutMutation = () => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'logoutMutation',
				},
			},
		});
	};

	return { logoutMutation, results };
};

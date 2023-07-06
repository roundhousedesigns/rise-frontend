/**
 * useChangeUserPassword hook. Mutation to reset a user's password.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_CHANGE_USER_PASSWORD = gql`
	mutation ChangePassword(
		$currentPassword: String!
		$newPassword: String! = ""
		$username: String!
	) {
		changePassword(
			input: { currentPassword: $currentPassword, newPassword: $newPassword, username: $username }
		) {
			clientMutationId
			success
		}
	}
`;

const useChangeUserPassword = () => {
	const [mutation, results] = useMutation(MUTATE_CHANGE_USER_PASSWORD);

	const changeUserPasswordMutation = (
		username: string,
		currentPassword: string,
		newPassword: string
	) => {
		return mutation({
			variables: {
				clientMutationId: 'changeUserPasswordMutation',
				username,
				currentPassword,
				newPassword,
			},
		});
	};

	return { changeUserPasswordMutation, results };
};

export default useChangeUserPassword;

/**
 * useDeleteOwnAccount hook. Mutation to delete a user's account.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_DELETE_OWN_ACCOUNT = gql`
	mutation DeleteOwnAccount($userId: ID!) {
		deleteOwnAccount(input: { userId: $userId }) {
			result
		}
	}
`;

const useDeleteOwnAccount = () => {
	const [mutation, result] = useMutation(MUTATE_DELETE_OWN_ACCOUNT);

	const deleteOwnAccountMutation = (userId: number) => {
		return mutation({
			variables: {
				clientMutationId: 'deleteOwnAccountMutation',
				userId,
			},
		});
	};

	return { deleteOwnAccountMutation, result };
};

export default useDeleteOwnAccount;

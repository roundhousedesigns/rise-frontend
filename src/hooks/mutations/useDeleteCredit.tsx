/**
 * useDeleteCredit hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_PROFILE } from '@queries/useUserProfile';

const MUTATE_DELETE_CREDIT = gql`
	mutation DeleteCredit($input: DeleteOwnCreditInput!) {
		deleteOwnCredit(input: $input) {
			result
			clientMutationId
		}
	}
`;

const useDeleteCredit = () => {
	const [mutation, results] = useMutation(MUTATE_DELETE_CREDIT);

	const deleteCreditMutation = (id: string, userId: number) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'deleteCreditMutation',
					id,
					userId,
				},
			},
			refetchQueries: [{ query: QUERY_PROFILE, variables: { id: userId, author: userId } }],
		});
	};

	return { deleteCreditMutation, results };
};

export default useDeleteCredit;

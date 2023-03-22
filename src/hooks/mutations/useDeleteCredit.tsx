/**
 * useDeleteCredit hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_DELETE_CREDIT = gql`
	mutation DeleteCredit($input: DeleteOwnCreditInput = {}) {
		deleteOwnCredit(input: $input) {
			result
			clientMutationId
		}
	}
`;

export const useDeleteCredit = () => {
	const [mutation, results] = useMutation(MUTATE_DELETE_CREDIT);

	const deleteCreditMutation = (id: string) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'deleteCreditMutation',
					id,
				},
			},
		});
	};

	return { deleteCreditMutation, results };
};

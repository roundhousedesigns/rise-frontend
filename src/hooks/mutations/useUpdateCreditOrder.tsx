/**
 * useUpdateCreditOrder hook. Mutation to create or update a Credit.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_UPDATE_CREDIT_ORDER = gql`
	mutation UpdateCreditOrderMutation(
		$input: UpdateCreditOrderInput = { creditIds: "", clientMutationId: "" }
	) {
		updateCreditOrder(input: $input) {
			creditIds
		}
	}
`;

const useUpdateCreditOrder = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_CREDIT_ORDER);

	const updateCreditOrderMutation = (creditIds: string[]) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'updateCreditOrderMutation',
					creditIds,
				},
			},
		});
	};

	return { updateCreditOrderMutation, results };
};

export default useUpdateCreditOrder;

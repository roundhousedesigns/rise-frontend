/**
 * useDeleteOwnConflictRange hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_PROFILE } from '@queries/useUserProfile';

const MUTATE_DELETE_UNAVAIL_RANGE = gql`
	mutation DeleteOwnSavedSearch($input: DeleteOwnConflictRangeInput!) {
		deleteOwnConflictRange(input: $input) {
			result
			clientMutationId
		}
	}
`;

const useDeleteOwnConflictRange = () => {
	const [mutation, results] = useMutation(MUTATE_DELETE_UNAVAIL_RANGE);

	const deleteOwnConflictRangeMutation = (id: number, userId: number) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'deleteOwnConflictRangeMutation',
					id: id.toString(),
					userId,
				},
			},
			refetchQueries: [{ query: QUERY_PROFILE, variables: { id: userId, author: userId } }],
		});
	};

	return { deleteOwnConflictRangeMutation, results };
};

export default useDeleteOwnConflictRange;

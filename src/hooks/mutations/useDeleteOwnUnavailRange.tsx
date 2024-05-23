/**
 * useDeleteOwnUnavailRange hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_PROFILE } from '../queries/useUserProfile';

const MUTATE_DELETE_UNAVAIL_RANGE = gql`
	mutation DeleteOwnSavedSearch($input: DeleteOwnUnavailRangeInput!) {
		deleteOwnUnavailRange(input: $input) {
			result
			clientMutationId
		}
	}
`;

const useDeleteOwnUnavailRange = () => {
	const [mutation, results] = useMutation(MUTATE_DELETE_UNAVAIL_RANGE);

	const deleteOwnUnavailRangeMutation = (id: number, userId: number) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'deleteOwnUnavailRangeMutation',
					id: id.toString(),
					userId,
				},
			},
			refetchQueries: [{ query: QUERY_PROFILE, variables: { id: userId, author: userId } }],
		});
	};

	console.debug('RESULTS', results);

	return { deleteOwnUnavailRangeMutation, results };
};

export default useDeleteOwnUnavailRange;

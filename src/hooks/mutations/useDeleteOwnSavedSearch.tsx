/**
 * useDeleteOwnSavedSearch hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_SAVED_SEARCHES } from '@hooks/queries/useSavedSearches';

const MUTATE_DELETE_CREDIT = gql`
	mutation DeleteOwnSavedSearch($input: DeleteOwnSavedSearchInput!) {
		deleteOwnSavedSearch(input: $input) {
			result
			clientMutationId
		}
	}
`;

const useDeleteOwnSavedSearch = () => {
	const [mutation, results] = useMutation(MUTATE_DELETE_CREDIT);

	const deleteOwnSavedSearchMutation = (id: string, userId: number) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'deleteOwnSavedSearchMutation',
					id,
					userId,
				},
			},
			refetchQueries: [{ query: QUERY_SAVED_SEARCHES, variables: { author: userId } }],
		});
	};

	return { deleteOwnSavedSearchMutation, results };
};

export default useDeleteOwnSavedSearch;

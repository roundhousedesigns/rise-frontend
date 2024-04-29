/**
 * useDeleteSavedSearch hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_SAVED_SEARCHES } from '@hooks/queries/useSavedSearches';

const MUTATE_DELETE_CREDIT = gql`
	mutation DeleteSavedSearch($input: DeleteOwnSavedSearchInput!) {
		deleteOwnSavedSearch(input: $input) {
			result
			clientMutationId
		}
	}
`;

const useDeleteSavedSearch = () => {
	const [mutation, results] = useMutation(MUTATE_DELETE_CREDIT);

	const deleteSavedSearchMutation = (id: string, userId: number) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'deleteSavedSearchMutation',
					id,
					userId,
				},
			},
			refetchQueries: [{ query: QUERY_SAVED_SEARCHES, variables: { author: userId } }],
		});
	};

	return { deleteSavedSearchMutation, results };
};

export default useDeleteSavedSearch;

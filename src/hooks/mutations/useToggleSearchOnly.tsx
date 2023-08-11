/**
 * useToggleSearchOnly hook. Mutation to toggle a profile's searchOnly status.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '../queries/useViewer';

// MAYBE get more user data from this mutation
const MUTATE_TOGGLE_SEARCH_ONLY = gql`
	mutation ToggleSearch($userId: Int!) {
		toggleSearchOnly(input: { userId: $userId }) {
			updatedSearchOnly
			clientMutationId
		}
	}
`;

const useToggleSearchOnly = () => {
	const [mutation, result] = useMutation(MUTATE_TOGGLE_SEARCH_ONLY);

	const toggleSearchOnlyMutation = (userId: number) => {
		return mutation({
			variables: {
				clientMutationId: 'toggleSearchOnlyMutation',
				userId,
			},
			refetchQueries: [{ query: QUERY_VIEWER }],
		});
	};

	return { toggleSearchOnlyMutation, result };
};

export default useToggleSearchOnly;

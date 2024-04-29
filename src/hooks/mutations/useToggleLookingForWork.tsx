/**
 * useToggleLookingForWork hook. Mutation to toggle a profile's LookingForWork status.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '@hooks/queries/useViewer';

const MUTATE_TOGGLE_AVAILABLE_FOR_WORK = gql`
	mutation ToggleLookingForWork($userId: Int!) {
		toggleLookingForWork(input: { userId: $userId }) {
			updatedLookingForWork
			clientMutationId
		}
	}
`;

const useToggleLookingForWork = () => {
	const [mutation, result] = useMutation(MUTATE_TOGGLE_AVAILABLE_FOR_WORK);

	const toggleLookingForWorkMutation = (userId: number) => {
		return mutation({
			variables: {
				clientMutationId: 'toggleLookingForWorkMutation',
				userId,
			},
			refetchQueries: [{ query: QUERY_VIEWER }],
		});
	};

	return { toggleLookingForWorkMutation, result };
};

export default useToggleLookingForWork;

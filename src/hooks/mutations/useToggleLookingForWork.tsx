/**
 * useToggleUnavailableForWork hook. Mutation to toggle a profile's UnavailableForWork status.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '../queries/useViewer';

const MUTATE_TOGGLE_AVAILABLE_FOR_WORK = gql`
	mutation ToggleUnavailableForWork($userId: Int!) {
		toggleUnavailableForWork(input: { userId: $userId }) {
			updatedUnavailableForWork
			clientMutationId
		}
	}
`;

const useToggleUnavailableForWork = () => {
	const [mutation, result] = useMutation(MUTATE_TOGGLE_AVAILABLE_FOR_WORK);

	const toggleUnavailableForWorkMutation = (userId: number) => {
		return mutation({
			variables: {
				clientMutationId: 'toggleUnavailableForWorkMutation',
				userId,
			},
			refetchQueries: [{ query: QUERY_VIEWER }],
		});
	};

	return { toggleUnavailableForWorkMutation, result };
};

export default useToggleUnavailableForWork;

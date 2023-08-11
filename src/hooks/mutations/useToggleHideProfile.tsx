/**
 * useToggleHideProfile hook. Mutation to toggle a profile's hideProfile status.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '../queries/useViewer';

// MAYBE get more user data from this mutation
const MUTATE_TOGGLE_SEARCH_ONLY = gql`
	mutation ToggleHideProfile($userId: Int!) {
		toggleHideProfile(input: { userId: $userId }) {
			updatedHideProfile
			clientMutationId
		}
	}
`;

const useToggleHideProfile = () => {
	const [mutation, result] = useMutation(MUTATE_TOGGLE_SEARCH_ONLY);

	const toggleHideProfileMutation = (userId: number) => {
		return mutation({
			variables: {
				clientMutationId: 'toggleHideProfileMutation',
				userId,
			},
			refetchQueries: [{ query: QUERY_VIEWER }],
		});
	};

	return { toggleHideProfileMutation, result };
};

export default useToggleHideProfile;

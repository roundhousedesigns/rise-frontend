/**
 * useToggleDisableProfile hook. Mutation to toggle a profile's disableProfile status.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '../queries/useViewer';

// MAYBE get more user data from this mutation
const MUTATE_TOGGLE_SEARCH_ONLY = gql`
	mutation ToggleDisableProfile($userId: Int!) {
		toggleDisableProfile(input: { userId: $userId }) {
			updatedDisableProfile
			clientMutationId
		}
	}
`;

const useToggleDisableProfile = () => {
	const [mutation, result] = useMutation(MUTATE_TOGGLE_SEARCH_ONLY);

	const toggleDisableProfileMutation = (userId: number) => {
		return mutation({
			variables: {
				clientMutationId: 'toggleDisableProfileMutation',
				userId,
			},
			refetchQueries: [{ query: QUERY_VIEWER }],
		});
	};

	return { toggleDisableProfileMutation, result };
};

export default useToggleDisableProfile;

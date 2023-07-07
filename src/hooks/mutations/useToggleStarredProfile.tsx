/**
 * useToggleStarredProfile hook. Mutation to star or unstar a profile.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '../queries/useViewer';

// TODO deprecate year
const MUTATE_TOGGLE_STARRED_PROFILE = gql`
	mutation ToggleStarredProfileMutation(
		$clientMutationId: String
		$toggledProfileId: Int
		$loggedInId: Int
	) {
		toggleStarredProfile(
			input: {
				clientMutationId: $clientMutationId
				toggledProfileId: $toggledProfileId
				loggedInId: $loggedInId
			}
		) {
			clientMutationId
			success
		}
	}
`;

const useToggleStarredProfile = () => {
	const [mutation, results] = useMutation(MUTATE_TOGGLE_STARRED_PROFILE);

	const toggleStarredProfileMutation = (loggedInId: number, toggledProfileId: number) => {
		return mutation({
			variables: {
				clientMutationId: 'toggleStarredProfileMutation',
				loggedInId,
				toggledProfileId,
			},
			refetchQueries: [
				{
					query: QUERY_VIEWER,
					fetchPolicy: 'network-only',
				},
			],
		});
	};

	return { toggleStarredProfileMutation, results };
};

export default useToggleStarredProfile;

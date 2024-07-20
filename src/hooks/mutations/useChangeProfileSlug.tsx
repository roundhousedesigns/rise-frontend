/**
 * useChangeProfileSlug hook. Mutation to reset a user's password.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '@queries/useViewer';

const MUTATE_CHANGE_PROFILE_SLUG = gql`
	mutation ChangeProfileSlug($userId: Int!, $newSlug: String!) {
		changeProfileSlug(input: { userId: $userId, newSlug: $newSlug }) {
			clientMutationId
			success
			slug
		}
	}
`;

const useChangeProfileSlug = () => {
	const [mutation, results] = useMutation(MUTATE_CHANGE_PROFILE_SLUG);

	const changeProfileSlugMutation = (userId: number, newSlug: string) => {
		return mutation({
			variables: {
				clientMutationId: 'changeProfileSlugMutation',
				userId,
				newSlug,
			},
			refetchQueries: [{ query: QUERY_VIEWER, fetchPolicy: 'network-only' }],
		});
	};

	return { changeProfileSlugMutation, results };
};

export default useChangeProfileSlug;

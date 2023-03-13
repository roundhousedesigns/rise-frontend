/**
 * useUpdateProfile hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';
import { UserProfile } from '../../lib/classes';
import { QUERY_PROFILE } from '../queries/useUserProfile';

const MUTATE_UPDATE_USER = gql`
	mutation UpdateProfile($input: UpdateProfileInput = {}) {
		updateProfile(input: $input) {
			clientMutationId
			result
		}
	}
`;

export const useUpdateProfile = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_USER);

	const updateProfileMutation = (profile: UserProfile) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'updateProfileMutation',
					profile,
				},
			},
			refetchQueries: [{ query: QUERY_PROFILE, variables: { id: profile.id, author: profile.id } }],
		});
	};

	return { updateProfileMutation, results };
};

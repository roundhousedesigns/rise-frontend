/**
 * useUpdateProfile hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';
import { UserProfile } from '@lib/classes';
import { prepareUserProfileForGQL } from '@lib/utils';
import { QUERY_PROFILE } from '@queries/useUserProfile';

const MUTATE_UPDATE_USER = gql`
	mutation UpdateProfile($input: UpdateProfileInput = {}) {
		updateProfile(input: $input) {
			clientMutationId
			result
		}
	}
`;

const useUpdateProfile = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_USER);

	const updateProfileMutation = (profile: UserProfile) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'updateProfileMutation',
					profile: prepareUserProfileForGQL(profile),
				},
			},
			refetchQueries: [{ query: QUERY_PROFILE, variables: { id: profile.id, author: profile.id } }],
		});
	};

	return { updateProfileMutation, results };
};

export default useUpdateProfile;

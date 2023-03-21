/**
 * useUpdateCredit hook. Mutation to update a Credit.
 *
 * @deprecated Credits not updated in the database indepdenently of the profile.
 */

import { gql, useMutation } from '@apollo/client';
import { Credit } from '../../lib/classes';

const MUTATE_UPDATE_CREDIT = gql`
	mutation UpdateProfile($input: UpdateProfileCreditInput = {}) {
		updateProfile(input: $input) {
			clientMutationId
			result
		}
	}
`;

export const useUpdateCredit = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_CREDIT);

	const updateCreditMutation = (credit: Credit) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'updateCreditMutation',
					credit,
				},
			},
		});
	};

	return { updateCreditMutation, results };
};

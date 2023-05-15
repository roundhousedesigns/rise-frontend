/**
 * useSendPasswordResetEmail hook. Mutation to send the user a password reset email.
 */

import { gql, useMutation } from '@apollo/client';
import { LostPasswordInput } from '../../lib/types';

const MUTATE_SEND_PASSWORD_RESET = gql`
	mutation SendPasswordResetEmailMutation(
		$input: SendPasswordResetEmailWithReCaptchaInput = { reCaptchaToken: "", username: "" }
	) {
		sendPasswordResetEmailWithReCaptcha(input: $input) {
			clientMutationId
			success
		}
	}
`;

export const useSendPasswordResetEmail = () => {
	const [mutation, results] = useMutation(MUTATE_SEND_PASSWORD_RESET);

	const sendPasswordResetEmailMutation = ({ username, reCaptchaToken }: LostPasswordInput) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'sendPasswordResetEmailMutation',
					username,
					reCaptchaToken,
				},
			},
		});
	};

	return { sendPasswordResetEmailMutation, results };
};

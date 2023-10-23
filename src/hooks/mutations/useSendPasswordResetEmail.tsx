/**
 * useSendPasswordResetEmail hook. Mutation to send the user a password reset email.
 */

import { gql, useMutation } from '@apollo/client';

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

const useSendPasswordResetEmail = () => {
	const [mutation, results] = useMutation(MUTATE_SEND_PASSWORD_RESET);

	const sendPasswordResetEmailMutation = ({
		username,
		reCaptchaToken,
	}: {
		username: string;
		reCaptchaToken: string;
	}) => {
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

export default useSendPasswordResetEmail;

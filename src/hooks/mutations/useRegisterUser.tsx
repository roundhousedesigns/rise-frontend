/**
 * useRegisterUser hook. Mutation to register a new user.
 */

import { gql, useMutation } from '@apollo/client';
import { RegisterUserInput } from '../../lib/types';

const MUTATE_REGISTER_USER = gql`
	mutation RegisterUserMutation(
		$input: RegisterUserWithReCaptchaInput = { reCaptchaToken: "", username: "" }
	) {
		registerUserWithReCaptcha(input: $input) {
			user {
				databaseId
			}
			clientMutationId
		}
	}
`;

export const useRegisterUser = () => {
	const [mutation, results] = useMutation(MUTATE_REGISTER_USER);

	const registerUserMutation = (user: RegisterUserInput) => {
		const { email, firstName, lastName, password, confirmPassword, reCaptchaToken } = user;

		// TODO: Verify if this additional check is necessary
		if (password !== confirmPassword) {
			throw new Error('Passwords do not match');
		}

		return mutation({
			variables: {
				input: {
					username: email,
					email,
					lastName,
					firstName,
					password,
					reCaptchaToken,
				},
			},
		});
	};

	return { registerUserMutation, results };
};

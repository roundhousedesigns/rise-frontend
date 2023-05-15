/**
 * useLogin hook. Mutation to provide credentials and set an HTTP cookie.
 */

import { gql, useMutation } from '@apollo/client';
import { LoginInput } from '../../lib/types';

// MAYBE get more user data from this mutation
const MUTATE_LOGIN = gql`
	mutation Login($login: String!, $password: String!, $reCaptchaToken: String!) {
		loginWithCookiesAndReCaptcha(
			input: { login: $login, password: $password, reCaptchaToken: $reCaptchaToken }
		) {
			clientMutationId
			status
		}
	}
`;

export const useLogin = () => {
	const [mutation, results] = useMutation(MUTATE_LOGIN);

	const loginMutation = ({ login, password, reCaptchaToken }: LoginInput) => {
		return mutation({
			variables: {
				clientMutationId: 'loginMutation',
				login,
				password,
				reCaptchaToken,
			},
		});
	};

	return { loginMutation, results };
};

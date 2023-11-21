/**
 * useLogin hook. Mutation to provide credentials and set an HTTP cookie.
 */

import { gql, useMutation } from '@apollo/client';
import { LoginInput } from '@lib/types';
import { QUERY_VIEWER } from '../queries/useViewer';

const MUTATE_LOGIN = gql`
	mutation Login($login: String!, $password: String!, $reCaptchaToken: String!) {
		loginWithCookiesAndReCaptcha(
			input: { login: $login, password: $password, reCaptchaToken: $reCaptchaToken }
		) {
			status
		}
	}
`;

const useLogin = () => {
	const [mutation, results] = useMutation(MUTATE_LOGIN);

	const loginMutation = ({ login, password, reCaptchaToken }: LoginInput) => {
		return mutation({
			variables: {
				clientMutationId: 'loginMutation',
				login,
				password,
				reCaptchaToken,
			},
			refetchQueries: [{ query: QUERY_VIEWER }],
		});
	};

	return { loginMutation, results };
};

export default useLogin;

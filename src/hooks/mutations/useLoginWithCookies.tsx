/**
 * useLogin hook. Mutation to provide credentials and set an HTTP cookie.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_LOGIN = gql`
	mutation loginWithCookies(
		$input: LoginWithCookiesInput = { login: "", password: "" }
	) {
		loginWithCookies(input: $input) {
			clientMutationId
			status
		}
	}
`;

export const useLoginWithCookies = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_LOGIN);

	interface loginInput {
		login: string;
		password: string;
	}

	const loginMutation = ({ login, password }: loginInput) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'loginWithCookiesMutation',
					login: login,
					password: password,
				},
			},
		});
	};

	return { loginMutation, results: mutationResults };
};

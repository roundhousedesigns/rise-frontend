/**
 * useLogin hook. Mutation to provide credentials and set an HTTP cookie.
 */

import { gql, useMutation } from '@apollo/client';
import { LoginInput } from '../../../lib/types';

// TODO get more user data from this mutation
const MUTATE_LOGIN = gql`
	mutation LoginWithCookies($input: LoginWithCookiesInput = { login: "", password: "" }) {
		loginWithCookies(input: $input) {
			clientMutationId
			id
			status
		}
	}
`;

export const useLogin = () => {
	const [mutation, results] = useMutation(MUTATE_LOGIN);

	const loginMutation = ({ login, password }: LoginInput) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'loginMutation',
					login: login,
					password: password,
				},
			},
		});
	};

	return { loginMutation, results };
};

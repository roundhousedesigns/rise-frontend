/**
 * useLogin hook. Mutation to provide credentials and set an HTTP cookie.
 */

import { gql, useMutation } from '@apollo/client';
import { LoginInput } from '../../lib/types';

// MAYBE get more user data from this mutation
const MUTATE_LOGIN = gql`
	mutation Login($input: LoginInput = { username: "", password: "" }) {
		login(input: $input) {
			clientMutationId
			authToken
			refreshToken
			user {
				id: databaseId
			}
		}
	}
`;

export const useLogin = () => {
	const [mutation, results] = useMutation(MUTATE_LOGIN);

	const loginMutation = ({ username, password }: LoginInput) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'loginMutation',
					username: username,
					password: password,
				},
			},
		});
	};

	return { loginMutation, results };
};

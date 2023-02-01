/**
 * useLogin hook. Mutation to provide credentials and set an HTTP cookie.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_LOGIN = gql`
	mutation LoginUser($input: LoginInput = { login: "", password: "" }) {
		login(input: $input) {
			clientMutationId
			id
			status
		}
	}
`;

export const useLoginMutation = () => {
	const [mutation, results] = useMutation(MUTATE_LOGIN);

	interface loginInput {
		login: string;
		password: string;
	}

	const loginMutation = ({ login, password }: loginInput) => {
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

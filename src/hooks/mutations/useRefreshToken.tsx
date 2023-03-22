/**
 * useRefreshToken hook. Mutation to refresh the JWT authToken.
 */

// TODO reimplement when we go back to JWTs in cookies

import { gql, useMutation } from '@apollo/client';

const REFRESH_AUTH_TOKEN = gql`
	mutation RefreshAuthToken(
		$input: RefreshJwtAuthTokenInput = { jwtRefreshToken: "", clientMutationId: "" }
	) {
		refreshJwtAuthToken(input: $input) {
			authToken
			clientMutationId
		}
	}
`;

export const useRefreshToken = () => {
	const [mutation, results] = useMutation(REFRESH_AUTH_TOKEN);

	const refreshTokenMutation = (refreshToken: string) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'refreshAuthTokenMutation',
					jwtRefreshToken: refreshToken,
				},
			},
		});
	};

	return { refreshTokenMutation, results };
};

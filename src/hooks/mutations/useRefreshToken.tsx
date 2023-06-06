/**
 * useRefreshToken hook. Mutation to refresh the JWT authToken.
 *
 * @depreacted At least temporarily not in use, unless we go back to JWT auth.
 */

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

const useRefreshToken = () => {
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

export default useRefreshToken;

/**
 * useToggleIsOrg hook. Mutation to toggle a profile's isOrg status.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '../queries/useViewer';

const MUTATE_TOGGLE_IS_ORG = gql`
	mutation ToggleIsOrg($userId: Int!) {
		toggleIsOrg(input: { userId: $userId }) {
			updatedIsOrg
			clientMutationId
		}
	}
`;

const useToggleIsOrg = () => {
	const [mutation, result] = useMutation(MUTATE_TOGGLE_IS_ORG);

	const toggleIsOrgMutation = (userId: number) => {
		return mutation({
			variables: {
				clientMutationId: 'toggleIsOrgMutation',
				userId,
			},
			refetchQueries: [{ query: QUERY_VIEWER }],
		});
	};

	return { toggleIsOrgMutation, result };
};

export default useToggleIsOrg;

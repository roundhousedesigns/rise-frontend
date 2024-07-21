/**
 * useClearProfileField hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_PROFILE } from '@queries/useUserProfile';

const MUTATE_CLEAR_FIELD = gql`
	mutation clearProfileFieldMutation($fieldName: String!, $userId: Int!) {
		clearProfileField(input: { fieldName: $fieldName, userId: $userId }) {
			result
		}
	}
`;

const useClearProfileField = () => {
	const [mutation, results] = useMutation(MUTATE_CLEAR_FIELD);

	const clearProfileFieldMutation = (userId: number, fieldName: string) => {
		return mutation({
			variables: {
				clientMutationId: 'clearProfileFieldMutation',
				userId,
				fieldName,
			},
			refetchQueries: [{ query: QUERY_PROFILE, variables: { id: userId, author: userId } }],
		});
	};

	return { clearProfileFieldMutation, results };
};

export default useClearProfileField;

/**
 * useUpdateConflictRange hook. Mutation to create or update a Credit.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_PROFILE } from '@queries/useUserProfile';

const MUTATE_UPDATE_UNAVAIL_RANGE = gql`
	mutation updateConflictRangeMutation($input: UpdateOrCreateConflictRangeInput = {}) {
		updateOrCreateConflictRange(input: $input) {
			id
		}
	}
`;

const useUpdateConflictRange = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_UNAVAIL_RANGE);

	const updateConflictRangeMutation = (
		id: number = 0,
		userId: number,
		startDate: Date,
		endDate: Date
	) => {
		return mutation({
			variables: {
				input: {
					id,
					userId,
					startDate: startDate.toISOString(),
					endDate: endDate.toISOString(),
				},
			},
			refetchQueries: [
				{
					query: QUERY_PROFILE,
					variables: { id: userId, author: userId, lastCredits: 5 },
				},
			],
		});
	};

	return { updateConflictRangeMutation, results };
};

export default useUpdateConflictRange;

/**
 * useUpdateUnavailRange hook. Mutation to create or update a Credit.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_PROFILE } from '@hooks/queries/useUserProfile';

const MUTATE_UPDATE_UNAVAIL_RANGE = gql`
	mutation updateUnavailRangeMutation($input: UpdateOrCreateUnavailRangeInput = {}) {
		updateOrCreateUnavailRange(input: $input) {
			id
		}
	}
`;

const useUpdateUnavailRange = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_UNAVAIL_RANGE);

	const updateUnavailRangeMutation = (
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
					startDate: startDate.toLocaleDateString(),
					endDate: endDate.toLocaleDateString(),
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

	return { updateUnavailRangeMutation, results };
};

export default useUpdateUnavailRange;

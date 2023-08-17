/**
 * useUpdateCredit hook. Mutation to create or update a Credit.
 */

import { gql, useMutation } from '@apollo/client';
import { CreditOutput } from '../../lib/types';
import { QUERY_PROFILE } from '../queries/useUserProfile';

// TODO deprecate year
const MUTATE_UPDATE_CREDIT = gql`
	mutation UpdateCreditMutation($input: UpdateOrCreateCreditInput = {}) {
		updateOrCreateCredit(input: $input) {
			updatedCredit {
				id: databaseId
				index
				title
				jobTitle
				jobLocation
				venue
				year
				workStart
				workEnd
				workCurrent
				departments
				jobs
				skills
			}
		}
	}
`;

const useUpdateCredit = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_CREDIT);

	const updateCreditMutation = (credit: CreditOutput, userId: number) => {
		console.info(credit);
		return mutation({
			variables: {
				input: {
					credit,
				},
			},
			refetchQueries: [
				{
					query: QUERY_PROFILE,
					variables: { id: userId, author: userId, last: 5 },
				},
			],
		});
	};

	return { updateCreditMutation, results };
};

export default useUpdateCredit;

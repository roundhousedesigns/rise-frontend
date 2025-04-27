/**
 * useUpdateJobPost hook. Mutation to create or update a Job Post.
 */

import { gql, useMutation } from '@apollo/client';
import { JobPostOutput } from '@lib/types';

const MUTATE_UPDATE_JOB_POST = gql`
	mutation UpdateOrCreateJobPost($input: UpdateOrCreateJobPostInput!) {
		updateOrCreateJobPost(input: $input) {
			jobPost {
				databaseId
				author
				title
				companyName
				companyAddress
				contactName
				contactEmail
				contactPhone
				startDate
				endDate
				instructions
				compensation
				applicationUrl
				applicationPhone
				applicationEmail
				description
				isPaid
				isInternship
				isUnion
			}
		}
	}
`;

const useUpdateJobPost = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_JOB_POST);

	const updateJobPostMutation = (jobPost: JobPostOutput) => {
		return mutation({
			variables: {
				input: jobPost,
			},
		});
	};

	return { updateJobPostMutation, results };
};

export default useUpdateJobPost;

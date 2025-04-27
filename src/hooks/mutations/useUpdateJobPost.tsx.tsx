/**
 * useUpdateJobPost hook. Mutation to create or update a Job Post.
 */

import { gql, useMutation } from '@apollo/client';

// Define the JobPost type based on the GraphQL schema
export interface JobPost {
	id?: string;
	title: string;
	companyName: string;
	companyAddress: string;
	contactName: string;
	contactEmail: string;
	contactPhone?: string;
	startDate: string;
	endDate?: string;
	instructions: string;
	compensation?: string;
	applicationUrl?: string;
	applicationPhone?: string;
	applicationEmail?: string;
	description?: string;
	isPaid?: boolean;
	isInternship?: boolean;
	isUnion?: boolean;
}

const MUTATE_UPDATE_JOB_POST = gql`
	mutation UpdateOrCreateJobPostMutation(
		$input: UpdateOrCreateJobPostInput = {
			companyAddress: ""
			companyName: ""
			contactEmail: ""
			contactName: ""
			instructions: ""
			startDate: ""
			title: ""
		}
	) {
		updateOrCreateJobPost(input: $input) {
			clientMutationId
			jobPost {
				title
				description
				startDate
				isUnion
				isPaid
				isInternship
				databaseId
			}
		}
	}
`;

const useUpdateJobPost = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_JOB_POST);

	const updateJobPostMutation = (jobPost: JobPost) => {
		console.log('jobPost', jobPost);
		return mutation({
			variables: {
				input: jobPost,
			},
		});
	};

	return { updateJobPostMutation, results };
};

export default useUpdateJobPost;

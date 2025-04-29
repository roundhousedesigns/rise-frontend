/**
 * useJobPosts hook. Query to retrieve job posts.
 */

import { omit } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { JobPost } from '@lib/classes';
import { JobPostParams } from '@lib/types';

// TODO update Job class props to match the query

export const QUERY_JOB_POSTS = gql`
	query JobPostsQuery($ids: [ID] = [], $stati: [PostStatusEnum] = [PENDING, PUBLISH]) {
		jobPosts(where: { in: $ids, stati: $stati }) {
			nodes {
				id: databaseId
				status
				companyName(format: RAW)
				companyAddress(format: RAW)
				contactEmail(format: RAW)
				contactName(format: RAW)
				contactPhone(format: RAW)
				startDate
				description(format: RAW)
				compensation
				isInternship
				isPaid
				isUnion
				endDate
				instructions(format: RAW)
				applicationUrl
				applicationPhone
				applicationEmail
				title
				authorNode: author {
					node {
						databaseId
					}
				}
			}
		}
	}
`;

const useJobPosts = (ids: number[] = []): [JobPost[], any] => {
	const result = useQuery(QUERY_JOB_POSTS, {
		variables: {
			ids: ids.map((id) => id.toString()), // Convert numbers to strings for ID type
		},
		fetchPolicy: 'cache-and-network',
		// Skip the query entirely if we have no IDs
		skip: ids.length === 0,
	});

	if (!result?.data?.jobPosts?.nodes || ids.length === 0) {
		return [[], omit(result, ['data'])];
	}

	const jobPosts: JobPost[] =
		result?.data?.jobPosts?.nodes?.map((node: JobPostParams) => {
			const {
				id,
				status,
				title,
				description,
				companyName,
				contactEmail,
				contactName,
				compensation,
				startDate,
				endDate,
				companyAddress,
				instructions,
				isInternship,
				isPaid,
				isUnion,
				applicationUrl,
				applicationPhone,
				applicationEmail,
			} = node;

			const author = node?.authorNode?.node?.databaseId;

			const job = new JobPost({
				id,
				author,
				status,
				title,
				description,
				companyName,
				contactEmail,
				contactName,
				compensation,
				startDate,
				endDate,
				companyAddress,
				instructions,
				isInternship,
				isPaid,
				isUnion,
				applicationUrl,
				applicationPhone,
				applicationEmail,
			});

			Object.assign(job, node);

			return job;
		}) ?? [];

	return [jobPosts, omit(result, ['data'])];
};

export default useJobPosts;

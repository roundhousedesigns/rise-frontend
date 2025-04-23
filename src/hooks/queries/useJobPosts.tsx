/**
 * useJobPosts hook. Query to retrieve jobs.
 */

import { omit } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { JobPost } from '@lib/classes';
import { JobPostParams } from '@lib/types';

// TODO update Job class props to match the query

export const QUERY_JOBS = gql`
	query JobsQuery($ids: [ID] = []) {
		jobs(where: { in: $ids }) {
			nodes {
				id: databaseId
				companyName(format: RAW)
				companyAddress(format: RAW)
				contactEmail(format: RAW)
				contactName(format: RAW)
				contactPhone(format: RAW)
				startDate
				description: content
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
			}
		}
	}
`;

const useJobPosts = (ids: number[] = []): [JobPost[], any] => {
	const result = useQuery(QUERY_JOBS, {
		variables: {
			ids: ids.map((id) => id.toString()), // Convert numbers to strings for ID type
		},
		fetchPolicy: 'cache-and-network',
		// Skip the query entirely if we have no IDs
		skip: ids.length === 0,
	});

	if (!result?.data?.jobs?.nodes || ids.length === 0) {
		return [[], omit(result, ['data'])];
	}

	const jobs: JobPost[] =
		result?.data?.jobs?.nodes?.map((node: JobPostParams) => {
			const {
				id,
				title,
				companyName,
				contactEmail,
				contactName,
				compensation,
				startDate,
				companyAddress,
				instructions,
			} = node;

			const job = new JobPost({
				id,
				title,
				companyName,
				contactEmail,
				contactName,
				compensation,
				startDate,
				companyAddress,
				instructions,
			});

			Object.assign(job, node);

			return job;
		}) ?? [];

	return [jobs, omit(result, ['data'])];
};

export default useJobPosts;

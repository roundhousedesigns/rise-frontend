/**
 * useJobPosts hook. Query to retrieve jobs.
 */

import { omit } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { JobPost } from '@lib/classes';
import { JobPostParams } from '@lib/types';

// TODO update Job class props to match the query

export const QUERY_JOBS = gql`
	query JobsQuery($id: Int = 0) {
		jobs(where: { id: $id }) {
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

const useJobPosts = (id: number = 0): [JobPost[], any] => {
	const result = useQuery(QUERY_JOBS, {
		variables: { id },
	});

	if (!result?.data?.jobs?.nodes) {
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

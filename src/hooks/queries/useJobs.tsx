/**
 * useJobs hook. Query to retrieve jobs.
 */

import { omit } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { Job } from '@lib/classes';
import { JobParams } from '@@/src/lib/types';

// TODO update Job class props to match the query

export const QUERY_JOBS = gql`
	query JobsQuery($id: Int = 0) {
		jobs(where: { id: $id }) {
			nodes {
				id: databaseId
				companyName(format: RAW)
				contactEmail(format: RAW)
				contactName(format: RAW)
				applicationUrl
				applicationPhone
				applicationEmail
				description: content
				compensation
				isInternship
				isUnionJob
				endDate
				instructions(format: RAW)
				address(format: RAW)
				startDate
				phone
				title
			}
		}
	}
`;

const useJobs = (id: number = 0): [Job[], any] => {
	const result = useQuery(QUERY_JOBS, {
		variables: { id },
	});

	if (!result?.data?.jobs?.nodes) {
		return [[], omit(result, ['data'])];
	}
	const jobs: Job[] =
		result?.data?.jobs?.nodes?.map((node: JobParams) => {
			const {
				id,
				title,
				companyName,
				contactEmail,
				contactName,
				compensation,
				startDate,
				address,
				instructions,
			} = node;

			const job = new Job({
				id,
				title,
				companyName,
				contactEmail,
				contactName,
				compensation,
				startDate,
				address,
				instructions,
			});

			Object.assign(job, node);

			return job;
		}) ?? [];

	return [jobs, omit(result, ['data'])];
};

export default useJobs;

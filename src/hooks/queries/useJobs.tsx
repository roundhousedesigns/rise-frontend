/**
 * useJobs hook. Query to retrieve jobs.
 */

import { omit } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { Job } from '@lib/types';

export const QUERY_JOBS = gql`
	query JobsQuery($id: Int) {
		jobs(where: { id: $id }) {
			nodes {
				id: databaseId
				companyName(format: RAW)
				contactEmail(format: RAW)
				contactName(format: RAW)
			}
		}
	}
`;

const useJobs = (id: number = 0): [Job[], any] => {
	const result = useQuery(QUERY_JOBS, {
		variables: { id },
	});

	const jobs: Job[] = result?.data?.jobs?.nodes?.map((node: Job) => {
		const { id, companyName, contactEmail, contactName } = node;
		return { id, companyName, contactEmail, contactName };
	}) ?? [];

	return [jobs, omit(result, ['data'])];
};

export default useJobs;

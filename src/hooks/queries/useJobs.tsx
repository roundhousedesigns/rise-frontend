/**
 * useJobs hook. Query to retrieve jobs.
 */

import { omit } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { Job } from '@lib/classes';
import { JobParams } from '@@/src/lib/types';

export const QUERY_JOBS = gql`
	query JobsQuery($id: Int) {
		jobs(where: { id: $id }) {
			nodes {
				id: databaseId
				title
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

	const jobs: Job[] =
		result?.data?.jobs?.nodes?.map((node: JobParams) => {
			const { id, title, companyName, contactEmail, contactName } = node;
			return new Job({ id, title, companyName, contactEmail, contactName });
		}) ?? [];

	return [jobs, omit(result, ['data'])];
};

export default useJobs;

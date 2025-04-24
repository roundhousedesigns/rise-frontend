/**
 * useFilteredJobPosts hook. Query to retrieve job posts.
 */

import { omit } from 'lodash';
import { gql, useQuery } from '@apollo/client';

export const QUERY_FILTERED_JOB_POST_IDS = gql`
	query FilteredJobPostIdsQuery($internships: Boolean, $paid: Boolean, $union: Boolean) {
		filteredJobPostIds(internships: $internships, paid: $paid, union: $union)
	}
`;

interface FilteredJobPostsParams {
	internships?: boolean;
	union?: boolean;
	paid?: boolean;
}

const useFilteredJobPosts = (filters: FilteredJobPostsParams = {}): [number[], any] => {
	const result = useQuery(QUERY_FILTERED_JOB_POST_IDS, {
		variables: filters,
	});

	if (!result?.data?.filteredJobPostIds) {
		return [[], omit(result, ['data'])];
	}

	return [result.data.filteredJobPostIds, omit(result, ['data'])];
};

export default useFilteredJobPosts;

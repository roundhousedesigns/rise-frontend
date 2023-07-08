/**
 * useUserNotices hook. Query a post's (or page, CPT, etc) content by ID.
 */
import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

// WordPress block styles
import '../../assets/css/wordpress.css';

export const QUERY_GLOBAL_NOTICES = gql`
	query LatestUserNoticeQuery($last: Int = 4) {
		userNotices(last: $last) {
			nodes {
				id: databaseId
				title(format: RENDERED)
				content(format: RENDERED)
			}
		}
	}
`;

/**
 * Query to retrieve content by post ID.
 *
 * @param {number} last The number of notices to retrieve.
 * @returns A tuple of a prepared HTML string and a query result object.
 */
const useUserNotices = (last: number = 4): [string[], any] => {
	const result = useQuery(QUERY_GLOBAL_NOTICES, {
		variables: {
			last,
		},
	});

	const prepareNotices = result.data?.userNotices.nodes || [];

	return [prepareNotices, omit(result, ['data'])];
};

export default useUserNotices;

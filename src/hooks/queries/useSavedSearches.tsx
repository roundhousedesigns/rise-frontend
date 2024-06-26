/**
 * useSavedSearches hook. Query to retrieve Users by ID.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPPost } from '@lib/classes';
import { WPItemParams } from '@lib/types';
import useViewer from '@hooks/queries/useViewer';

export const QUERY_SAVED_SEARCHES = gql`
	query QuerySavedSearches($author: Int!) {
		savedSearches(where: { author: $author }) {
			nodes {
				content(format: RAW)
				title
				id: databaseId
				author: authorDatabaseId
			}
		}
	}
`;

export default function useSavedSearches(): [WPPost[], any] {
	const { loggedInId } = useViewer();
	const result = useQuery(QUERY_SAVED_SEARCHES, {
		variables: {
			author: loggedInId,
		},
	});

	const savedSearches: WPPost[] = result.data?.savedSearches?.nodes?.map(
		(savedSearch: WPItemParams) => {
			const { id, author, title, content } = savedSearch;

			const params = {
				id,
				author,
				title,
				content,
			};

			return new WPPost(params);
		}
	);

	return [savedSearches, omit(result, ['data'])];
}

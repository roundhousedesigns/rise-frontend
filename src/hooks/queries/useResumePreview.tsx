/**
 * useResumePreview hook. Query to retrieve resume previews.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

const QUERY_RESUME = gql`
	query MediaItemQuery($id: ID!) {
		mediaItem(id: $id, idType: SOURCE_URL) {
			sizes(size: THUMBNAIL)
			sourceUrl
		}
	}
`;

/**
 * Query to retrieve a resume previews and sourceURL
 *
 * @param id An option value. Do not prepend with `<pod_name>_`.
 * @returns A tuple of a prepared data object and a query result object.
 */

const useResumePreview = (resumeUrl: string) => {
	const result = useQuery(QUERY_RESUME, {
		variables: {
			id: resumeUrl,
		},
	});

	const { mediaItem } = result.data || {};

	return { mediaItem, result: omit(result, ['data']) };
};

export default useResumePreview;

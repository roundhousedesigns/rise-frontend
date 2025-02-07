/**
 * usePageIdBySlug hook. Query to get a Page by its slug.
 */

import { WPPost } from '@lib/classes';
import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

const QUERY_PAGE_BY_SLUG = gql`
	query QueryPageBySlug($name: String = "") {
		pages(where: { name: $name }) {
			nodes {
				id: databaseId
				content(format: RENDERED)
				title
				uri
			}
		}
	}
`;

/**
 * Query to get a Page by its slug
 *
 * @param {string} slug The slug of the Page.
 * @returns A tuple of a prepared data object and a query result object.
 */
const usePageBySlug = (slug: string): [WPPost | null, any] => {
	const result = useQuery(QUERY_PAGE_BY_SLUG, {
		variables: {
			slug,
		},
	});

	const { id, title, content, uri } = result.data?.pages.nodes[0] || {};

	const preparedPage = new WPPost({
		id,
		title,
		content,
		uri,
	});

	return [preparedPage, omit(result, ['data'])];
};

export default usePageBySlug;

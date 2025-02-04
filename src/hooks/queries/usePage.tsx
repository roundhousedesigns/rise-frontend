/**
 * usePage hook. Query a post's (or page, CPT, etc) content by ID.
 */
import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPPost } from '@lib/classes';

const QUERY_PAGE = gql`
	query PageQuery($id: ID = "") {
		page(id: $id, idType: DATABASE_ID) {
			id: databaseId
			title
			content
		}
	}
`;

/**
 * Query to retrieve content by post ID.
 *
 * @param {id} Post ID
 * @returns A tuple of a WPPost object and a query result object.
 */
const usePage = (id: number | string): [WPPost | null, any] => {
	const result = useQuery(QUERY_PAGE, {
		variables: {
			id,
		},
	});

	if (!result.data?.page) {
		return [null, omit(result, ['data'])];
	}

	const { id: postId, title, content } = result.data.page;

	const post = new WPPost({
		id: postId,
		title,
		content,
		postType: 'page',
	});

	return [post, omit(result, ['data'])];
};

export default usePage;

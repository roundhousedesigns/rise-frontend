/**
 * usePostContent hook. Query a post's (or page, CPT, etc) content by ID.
 */
import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import parse from 'html-react-parser';

// WordPress block styles
import '@assets/css/wordpress.css';

export const QUERY_CONTENT = gql`
	query PostContentQuery($id: ID = "") {
		page(id: $id, idType: DATABASE_ID) {
			content
		}
	}
`;

/**
 * Query to retrieve content by post ID.
 *
 * @param id Post ID
 * @returns A tuple of a prepared HTML string and a query result object.
 */
const usePostContent = (id: number | string): [string | null, any] => {
	const result = useQuery(QUERY_CONTENT, {
		variables: {
			id,
		},
	});

	let content = result.data?.page.content;
	content = content ? parse(content) : '';

	return [content, omit(result, ['data'])];
};

export default usePostContent;

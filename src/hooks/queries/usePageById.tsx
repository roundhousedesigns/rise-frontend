/**
 * usePageById hook. Query a post's (or page, CPT, etc) content by ID.
 */
import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPPost } from '@lib/classes';

const QUERY_PAGES = gql`
	query PagesQuery($id: Int!) {
		pages(where: { id: $id }) {
			nodes {
				id: databaseId
				title
				content(format: RENDERED)
			}
		}
	}
`;

/**
 * Query to retrieve content by post ID.
 *
 * @param {id} Post ID
 * @returns A tuple of a WPPost object and a query result object.
 */
const usePageById = (id: number): [WPPost | null, any] => {
	console.log('🔍 usePageById called with id:', id);

	const result = useQuery(QUERY_PAGES, {
		variables: { id },
		skip: !id,
		ssr: true,
		onError: (error) => {
			console.error('❌ usePageById query error:', error);
		},
		onCompleted: (data) => {
			console.log('✅ usePageById query completed:', data);
		}
	});

	if (!result.data?.pages?.nodes?.[0]) {
		console.log('⚠️ No data found for id:', id);
		return [null, omit(result, ['data'])];
	}

	const { id: postId, title, content } = result.data.pages.nodes[0];

	const post = new WPPost({
		id: postId,
		title,
		content,
		postType: 'page',
	});

	return [post, omit(result, ['data'])];
};

export default usePageById;

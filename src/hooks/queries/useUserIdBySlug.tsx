/**
 * useUserIdBySlug hook. Query to get a User ID by its slug (meta: `user_slug`).
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

const QUERY_USER_ID = gql`
	query QueryUserIdBySlug($slug: String!) {
		userIdBySlug(slug: $slug)
	}
`;

/**
 * Query to get a User ID by its slug
 *
 * @param {string} slug The slug of the User.
 * @returns A tuple of a prepared data object and a query result object.
 */
const useUserIdBySlug = (slug: string): [number | null, any] => {
	const result = useQuery(QUERY_USER_ID, {
		variables: {
			slug,
		},
	});

	const { userIdBySlug: userId } = result.data || {};

	return [userId, omit(result, ['data'])];
};

export default useUserIdBySlug;

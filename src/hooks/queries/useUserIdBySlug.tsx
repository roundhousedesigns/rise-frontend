/**
 * useUserIdBySlug hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

const QUERY_USER_ID = gql`
	query QueryUserIdBySlug($slug: String!) {
		userIdBySlug(slug: $slug)
	}
`;

/**
 * Query to retrieve a User ID by its slug (meta: `user_slug`)
 *
 * @param id User ID
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

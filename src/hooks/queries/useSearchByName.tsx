/**
 * useSearchByName hook.
 *
 * Queries users by a `name` search string.
 *
 * @returns {Array} The useLazyQuery return tuple.
 *
 */

import { gql, LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';

const QUERY_USERS_BY_NAME = gql`
	query UsersByName($name: String!) {
		usersByName(name: $name)
	}
`;

/**
 * useSeachByName hook.
 *
 * Queries users by a `name` search string.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
const useSearchByName = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_USERS_BY_NAME);
};

export default useSearchByName;

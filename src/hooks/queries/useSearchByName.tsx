/**
 * useSearchByName hook.
 *
 * Queries users by a `name` search string.
 *
 * @returns {Array} The useLazyQuery return tuple.
 *
 */

import { gql, LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';

// TODO add exclude param for current logged in user ID (like useCandidateSearch)
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
export const useSearchByName = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_USERS_BY_NAME);
};

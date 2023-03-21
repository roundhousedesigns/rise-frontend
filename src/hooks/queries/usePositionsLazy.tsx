/**
 * usePositionsLazy hook.
 *
 * DOCUMENT ME.
 */

import { LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';
import { QUERY_CREDITS } from './usePositions';

/**
 * usePositions hook.
 *
 * Queries `position` terms.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
export const usePositionsLazy = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_CREDITS);
};

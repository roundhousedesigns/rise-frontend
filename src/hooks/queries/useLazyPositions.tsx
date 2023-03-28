/**
 * useLazyPositions hook.
 *
 * DOCUMENT ME.
 */

import { LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';
import { QUERY_POSITION_TERMS } from './usePositions';

/**
 * usePositions hook.
 *
 * Queries `position` terms.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
export const useLazyPositions = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_POSITION_TERMS);
};

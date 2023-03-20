/**
 * usePositionsLazy hook.
 *
 * DOCUMENT ME.
 */

import { LazyQueryExecFunction, QueryResult, useLazyQuery, useQuery } from '@apollo/client';
import { WPItemParams } from '../../lib/types';
import { WPItem } from '../../lib/classes';
import { omit } from 'lodash';
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

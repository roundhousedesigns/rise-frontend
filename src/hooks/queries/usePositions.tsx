/**
 * usePositions hook.
 *
 * DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';
import { WPItemParams } from '../../lib/types';
import { WPItem } from '../../lib/classes';
import { omit } from 'lodash';

// Using `first: 40` to as a guess at a safe, but not excessive,
// number of terms to return.

const QUERY_CREDITS = gql`
	query PositionsQuery($parent: Int = 0) {
		positions(where: { hideEmpty: false, parent: $parent }, first: 40) {
			nodes {
				id: databaseId
				parentId: parentDatabaseId
				name
				slug
			}
		}
	}
`;

/**
 * usePositions hook.
 *
 * Queries `position` terms. Specify 0
 *
 * @param {number} parent - The parent term ID.
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
export const usePositions = (parent: number = 0): [WPItem[], any] => {
	const result = useQuery(QUERY_CREDITS, {
		variables: {
			parent,
		},
	});

	const preparedResult = result.data?.positions.nodes.map((term: WPItemParams) => new WPItem(term));

	return [preparedResult, omit(result, ['data'])];
};

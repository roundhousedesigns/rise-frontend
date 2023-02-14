/**
 * usePositions hook.
 *
 * DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';

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
 *
 * @returns {object} The query result object.
 */
export const usePositions = (parent = 0) => {
	const result = useQuery(QUERY_CREDITS, {
		variables: {
			parent,
		},
	});

	return result;
};

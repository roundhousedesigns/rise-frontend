/**
 * usePositions hook.
 *
 * DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';
import { WPItemParams } from '../../lib/types';
import { WPItem } from '../../lib/classes';
import { omit } from 'lodash';

export const QUERY_POSITION_TERMS = gql`
	query JobsQuery($departments: [ID] = "") {
		jobsByDepartments(departments: $departments) {
			id: databaseId
			parentId: parentDatabaseId
			name
			slug
		}
	}
`;

/**
 * usePositions hook.
 *
 * Queries `position` terms. Specify 0 for `parent` to get all terms.
 *
 * @param {number[]} parents - The parent term IDs (default: [0]).
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
export const usePositions = (parents: number[] = [0]): [WPItem[], any] => {
	const result = useQuery(QUERY_POSITION_TERMS, {
		variables: {
			departments: parents,
		},
	});

	const preparedResult = result.data?.jobsByDepartments.map(
		(term: WPItemParams) => new WPItem(term)
	);

	return [preparedResult, omit(result, ['data'])];
};

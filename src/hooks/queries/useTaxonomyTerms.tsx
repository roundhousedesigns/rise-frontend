/**
 * useTaxonomyTerms hook.
 *
 * // TODO DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPItemParams } from '../../lib/types';
import { WPItem } from '../../lib/classes';

const QUERY_TAXONOMY_TERM = gql`
	query TaxonomyTerms($include: [ID] = []) {
		terms(where: { include: $include, order: ASC }, first: 9999) {
			nodes {
				id: databaseId
				name
				slug
			}
		}
	}
`;

/**
 * usePositions hook. Queries a single taxonomy term by ID.
 *
 * Queries a term by ID.
 *
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
const useTaxonomyTerms = (include: number[] | null): [WPItem[] | null, any] => {
	if (!include || include.length === 0) return [null, null];

	const result = useQuery(QUERY_TAXONOMY_TERM, {
		variables: {
			include,
		},
	});

	const preparedResult = result.data
		? result.data.terms.nodes.map(
				(term: { [key: string]: any }) => new WPItem(term as WPItemParams)
		  )
		: null;

	return [preparedResult, omit(result, ['data'])];
};

export default useTaxonomyTerms;

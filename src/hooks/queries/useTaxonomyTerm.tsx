/**
 * useTaxonomyTerm hook.
 *
 * // TODO Replace this when useTaxononyTerms (plural) is ready.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPItemParams } from '../../lib/types';
import { WPItem } from '../../lib/classes';

const QUERY_TAXONOMY_TERM = gql`
	query TaxonomyTerm($id: ID = "") {
		termNode(idType: DATABASE_ID, id: $id) {
			databaseId
			name
			slug
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
const useTaxonomyTerm = (id: number | null): [WPItem | null, any] => {
	if (!id || id === 0) return [null, null];

	const result = useQuery(QUERY_TAXONOMY_TERM, {
		variables: {
			id,
		},
	});

	const preparedResult = result.data ? new WPItem(result.data.termNode as WPItemParams) : null;

	return [preparedResult, omit(result, ['data'])];
};

export default useTaxonomyTerm;

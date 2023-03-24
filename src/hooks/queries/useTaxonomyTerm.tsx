/**
 * useTaxonomyTerm hook. Queries a single taxonomy term by ID.
 *
 * @returns {Array} A tuple of a prepared data object and a query result object.
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
 * useTaxonomyTerm hook. Queries a single taxonomy term by ID.
 *
 * Queries a term by ID.
 *
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
const useTaxonomyTerm = (id: number | null): [WPItem | null, any] => {
	const result = useQuery(QUERY_TAXONOMY_TERM, {
		variables: {
			id,
		},
	});

	const preparedResult = result.data?.termNode
		? new WPItem(result.data.termNode as WPItemParams)
		: null;

	return [preparedResult, omit(result, ['data'])];
};

export default useTaxonomyTerm;

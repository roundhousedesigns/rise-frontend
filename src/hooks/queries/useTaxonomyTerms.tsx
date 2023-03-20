/**
 * useTaxonomyTerms hook.
 *
 * // TODO DOCUMENT ME.
 */

import { gql, LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';

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
 * @returns {Array} The useLazyQuery return tuple.
 */
const useTaxonomyTerms = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_TAXONOMY_TERM);
};

export default useTaxonomyTerms;

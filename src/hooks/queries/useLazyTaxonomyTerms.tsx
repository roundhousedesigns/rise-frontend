/**
 * useLazyTaxonomyTerms hook. Queries a single taxonomy term by ID.
 */

import { LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';
import { QUERY_TAXONOMY_TERMS } from '@queries/useTaxonomyTerms';

/**
 * usePositions hook. Queries a single taxonomy term by ID.
 *
 * Queries a term by ID.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
const useLazyTaxonomyTerms = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_TAXONOMY_TERMS);
};

export default useLazyTaxonomyTerms;

/**
 * useTaxonomyTerms hook.
 *
 * Queries a single taxonomy term by ID.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPItem } from '@lib/classes';
import { WPItemParams } from '@lib/types';

export const QUERY_TAXONOMY_TERMS = gql`
	query TaxonomyTerms($include: [ID] = []) {
		terms(where: { include: $include, order: ASC }, first: 9999) {
			nodes {
				id: databaseId
				name
				slug
				taxonomyName
				... on Position {
					name
					id: databaseId
					parent {
						node {
							id: databaseId
							name
						}
					}
				}
			}
		}
	}
`;

/**
 * useTaxonomyTerms hook. Queries a single taxonomy term by ID.
 *
 * Queries a term by ID.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
const useTaxonomyTerms = (ids: number[]): [WPItem[], any] => {
	const result = useQuery(QUERY_TAXONOMY_TERMS, {
		variables: {
			include: ids,
		},
	});

	const preparedResult: WPItem[] = [];
	if (result.data?.terms.nodes && result.data.terms.nodes.length > 0)
		result.data.terms.nodes.forEach((node: WPItemParams) => preparedResult.push(new WPItem(node)));

	return [preparedResult, omit(result, ['data'])];
};

export default useTaxonomyTerms;

/**
 * usePositions hook.
 *
 * DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPItemParams } from '@lib/types';
import { WPItem } from '@lib/classes';
import { sortWPItemsByName } from '@lib/utils';

export const QUERY_NETWORK_PARTNER_CATEGORY_TERMS = gql`
	query NetworkPartnerCategoryTermsQuery {
		networkPartnerCategories(last: 999) {
			nodes {
				id: databaseId
				slug
				name
			}
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
const useNetworkPartnerCategoryTerms = (): [WPItem[], any] => {
	const result = useQuery(QUERY_NETWORK_PARTNER_CATEGORY_TERMS);

	const preparedResult: WPItem[] = result.data?.networkPartnerCategories.nodes.map(
		(term: WPItemParams) => new WPItem(term)
	);
	preparedResult?.sort(sortWPItemsByName);

	return [preparedResult, omit(result, ['data'])];
};

export default useNetworkPartnerCategoryTerms;

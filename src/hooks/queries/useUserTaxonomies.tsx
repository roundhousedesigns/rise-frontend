/**
 * useUserTaxonomies hook.
 * Queries terms from `User` taxonomies.
 *
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPItemParams } from '@lib/types';
import { WPItem } from '@lib/classes';
import { sortWPItemsByName } from '@lib/utils';

const QUERY_USER_TAXONOMIES = gql`
	query UserTaxonomies {
		locations(first: 100, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		unions(first: 100, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		experienceLevels(first: 100, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		partnerDirectories(first: 100, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
				externalUrl
			}
		}
		genderIdentities(first: 100, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		personalIdentities(first: 100, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		racialIdentities(first: 100, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
	}
`;

/**
 * useUserTaxonomies hook.
 *
 * Queries terms from `User` taxonomies.
 *
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
const useUserTaxonomies = (): [{ [key: string]: WPItem[] }, any] => {
	const result = useQuery(QUERY_USER_TAXONOMIES);
	const dataKeys = [
		'locations',
		'unions',
		'partnerDirectories',
		'experienceLevels',
		'genderIdentities',
		'personalIdentities',
		'racialIdentities',
	];

	const preparedResult: { [key: string]: WPItem[] } = dataKeys.reduce((acc: any, key: string) => {
		acc[key] = result.data?.[key].nodes
			.map((term: WPItemParams) => new WPItem(term))
			?.sort(sortWPItemsByName);
		return acc;
	}, {});

	return [preparedResult, omit(result, ['data'])];
};

export default useUserTaxonomies;

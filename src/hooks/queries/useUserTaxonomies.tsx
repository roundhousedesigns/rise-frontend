/**
 * useUserTaxonomies hook.
 *
 * // TODO DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPItemParams } from '../../lib/types';
import { WPItem } from '../../lib/classes';

const QUERY_USER_TAXONOMIES = gql`
	query UserTaxonomies {
		locations(first: 1000000, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		unions(first: 1000000, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		experienceLevels(first: 1000000, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		genderIdentities(first: 1000000, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		personalIdentities(first: 1000000, where: { orderby: TERM_ORDER }) {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		racialIdentities(first: 1000000, where: { orderby: TERM_ORDER }) {
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
 * Queries terms from `User` taxonomies.
 *
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
const useUserTaxonomies = (): [{ [key: string]: WPItem[] }, any] => {
	const result = useQuery(QUERY_USER_TAXONOMIES);

	// TODO probably make this a little more elegant since it's the same op on all `result.data` props
	const preparedResult = {
		locations: result.data?.locations.nodes.map((term: WPItemParams) => new WPItem(term)),
		unions: result.data?.unions.nodes.map((term: WPItemParams) => new WPItem(term)),
		experienceLevels: result.data?.experienceLevels.nodes.map(
			(term: WPItemParams) => new WPItem(term)
		),
		genderIdentities: result.data?.genderIdentities.nodes.map(
			(term: WPItemParams) => new WPItem(term)
		),
		personalIdentities: result.data?.personalIdentities.nodes.map(
			(term: WPItemParams) => new WPItem(term)
		),
		racialIdentities: result.data?.racialIdentities.nodes.map(
			(term: WPItemParams) => new WPItem(term)
		),
	};

	return [preparedResult, omit(result, ['data'])];
};

export default useUserTaxonomies;

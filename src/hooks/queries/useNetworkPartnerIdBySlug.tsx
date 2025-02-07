/**
 * useNetworkPartnerIdBySlug hook. Query to get a NetworkPartner ID by its slug.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

const QUERY_NETWORK_PARTNER_ID = gql`
	query QueryNetworkPartnerIdBySlug($slug: String!) {
		networkPartnerIdBySlug(slug: $slug)
	}
`;

/**
 * Query to get a NetworkPartner ID by its slug
 *
 * @param {string} slug The slug of the NetworkPartner.
 * @returns A tuple of the networkPartner ID and a query result object.
 */
const useNetworkPartnerIdBySlug = (slug: string): [number | null, any] => {
	const result = useQuery(QUERY_NETWORK_PARTNER_ID, {
		variables: {
			slug,
		},
	});

	const { networkPartnerIdBySlug: networkPartnerId } = result.data || {};

	return [Number(networkPartnerId), omit(result, ['data'])];
};

export default useNetworkPartnerIdBySlug;

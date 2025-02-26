/**
 * useNetworkPartners hook. Query to retrieve network partner posts.
 */
import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPAttachment, WPNetworkPartner } from '@lib/classes';

export const QUERY_NETWORK_PARTNERS = gql`
	query QueryNetworkPartners($id: Int = 0, $networkPartnerCategories: [String] = "") {
		networkPartners(
			where: { id: $id, networkPartnerCategories: $networkPartnerCategories }
			last: 999
		) {
			nodes {
				id: databaseId
				slug
				title
				excerpt(format: RAW)
				content(format: RENDERED)
				externalUrl
				featuredImage {
					node {
						featuredImageId: databaseId
						srcSet(size: LARGE)
						title
					}
				}
				coverBg {
					node {
						databaseId
						sourceUrl(size: COVER)
					}
				}
			}
		}
	}
`;

interface UseNetworkPartnersProps {
	id?: number;
	networkPartnerCategories?: string[];
}

/**
 * Query to retrieve network partner posts.
 *
 * @param {number} id - Optional ID to query a specific network partner
 * @param {string[]} networkPartnerCategories - Optional network partner categories to query
 * @returns A tuple of a prepared data array and a query result object.
 */
const useNetworkPartners = ({
	id = 0,
	networkPartnerCategories = [],
}: UseNetworkPartnersProps = {}): [WPNetworkPartner[], any] => {
	const result = useQuery(QUERY_NETWORK_PARTNERS, {
		variables: { id, networkPartnerCategories },
	});

	if (!result?.data?.networkPartners?.nodes) {
		return [[], omit(result, ['data'])];
	}

	const preparedPartners =
		result.data?.networkPartners.nodes.map((partner: any) => {
			const { id, slug, title, featuredImage, excerpt, content, coverBg, externalUrl } = partner;

			return new WPNetworkPartner({
				id,
				slug,
				title,
				featuredImage: new WPAttachment({
					id: featuredImage?.node?.featuredImageId,
					srcSet: featuredImage?.node?.srcSet,
					title: featuredImage?.node?.title,
				}),
				coverBg: new WPAttachment({
					id: coverBg?.node?.databaseId,
					sourceUrl: coverBg?.node?.sourceUrl,
				}),
				excerpt,
				content,
				externalUrl,
			});
		}) || [];

	return [preparedPartners, omit(result, ['data'])];
};

export default useNetworkPartners;

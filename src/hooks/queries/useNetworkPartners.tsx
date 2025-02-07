/**
 * useNetworkPartners hook. Query to retrieve network partner posts.
 */
import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPAttachment, WPPost } from '@lib/classes';

export const QUERY_NETWORK_PARTNERS = gql`
	query QueryNetworkPartners($id: Int = 0) {
		networkPartners(where: { id: $id }, last: 999) {
			nodes {
				id: databaseId
				slug
				title
				featuredImage {
					node {
						featuredImageId: databaseId
						srcSet(size: LARGE)
						title
					}
				}
				excerpt(format: RAW)
				content(format: RENDERED)
			}
		}
	}
`;

/**
 * Query to retrieve network partner posts.
 *
 * @param {number} id - Optional ID to query a specific network partner
 * @returns A tuple of a prepared data array and a query result object.
 */
const useNetworkPartners = (id: number = 0): [WPPost[], any] => {
	const result = useQuery(QUERY_NETWORK_PARTNERS, {
		variables: { id },
	});

	if (!result?.data?.networkPartners?.nodes) {
		return [[], omit(result, ['data'])];
	}

	const preparedPartners =
		result.data?.networkPartners.nodes.map((partner: any) => {
			const { id, slug, title, featuredImage, excerpt, content } = partner;

			return new WPPost({
				id,
				slug,
				title,
				featuredImage: new WPAttachment({
					id: featuredImage?.node?.featuredImageId,
					srcSet: featuredImage?.node?.srcSet,
					title: featuredImage?.node?.title,
				}),
				excerpt,
				content,
			});
		}) || [];

	return [preparedPartners, omit(result, ['data'])];
};

export default useNetworkPartners;

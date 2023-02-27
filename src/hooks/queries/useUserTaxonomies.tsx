/**
 * useUserTaxonomies hook.
 *
 * // TODO DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_USER_TAXONOMIES = gql`
	query UserTaxonomies {
		genderIdentities {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		personalIdentities {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		racialIdentities {
			nodes {
				id: databaseId
				slug
				name
			}
		}
		unions {
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
 * @returns {object} The query result object.
 */
const useUserTaxonomies = () => {
	const result = useQuery(QUERY_USER_TAXONOMIES);

	return result;
};

export default useUserTaxonomies;

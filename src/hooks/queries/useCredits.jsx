/**
 * useCredits hook.
 *
 * DOCUMENT ME.
 */

import { gql, useQuery } from "@apollo/client";

export const QUERY_CREDITS = gql`
	query CreditsQuery($postsPerPage: Int = 10) {
		credits(first: $postsPerPage) {
			nodes {
				databaseId
			}
		}
	}
`;

/**
 * useCredits hook.
 *
 * Queries the latest `credit` items.
 *
 * @param {number} postsPerPage
 * @returns {object} The query result object.
 */
export const useCredits = (postsPerPage = null) => {
	const result = useQuery(QUERY_CREDITS, {
		variables: {
			postsPerPage,
		},
	});

	return result;
};

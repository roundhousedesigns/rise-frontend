/**
 * usePersonalFields hook.
 *
 * // TODO DOCUMENT ME.
 */

import { gql, useQuery } from '@apollo/client';

const QUERY_PERSONAL_FIELDS = gql`
	query PersonalFieldsQuery() {

	}
`;

/**
 * usePositions hook.
 *
 * Queries `skill` terms.
 *
 * @param {Array} exclude - An array of departments to exclude.
 *
 * @returns {object} The query result object.
 */
export const usePersonalFields = () => {
	const result = useQuery(QUERY_PERSONAL_FIELDS, {});

	return result;
};

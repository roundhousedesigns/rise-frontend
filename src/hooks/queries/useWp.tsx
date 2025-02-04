/**
 * useWp hook. Query to retrieve WordPress global stylesheet.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

const QUERY_WP_GLOBAL = gql`
	query WpGlobalQuery {
		wpGlobalStylesheet
	}
`;

/**
 * Query to retrieve WordPress global stylesheet.
 *
 * @returns A tuple of the stylesheet string and a query result object.
 */
const useWp = (): [string | null, any] => {
	const result = useQuery(QUERY_WP_GLOBAL);

	const { wpGlobalStylesheet } = result.data || {};

	return [wpGlobalStylesheet, omit(result, ['data'])];
};

export default useWp;

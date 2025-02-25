/**
 * useWp hook. Query to retrieve WordPress global stylesheet.
 */

import { gql, useQuery, QueryResult } from '@apollo/client';
import { omit } from 'lodash';

// TODO: Figure out why this is needed
import '@assets/css/wordpress.css';

const QUERY_WP_GLOBAL = gql`
	query WpGlobalQuery {
		wpGlobalStylesheet
	}
`;

interface WpGlobalQueryResult {
	wpGlobalStylesheet: string | null;
}

/**
 * Query to retrieve WordPress global stylesheet.
 *
 * @returns A tuple of the stylesheet string and a query result object.
 */
const useWp = (): [string | null, Omit<QueryResult<WpGlobalQueryResult>, 'data'>] => {
	const result = useQuery<WpGlobalQueryResult>(QUERY_WP_GLOBAL);

	const { wpGlobalStylesheet = null } = result.data || {};

	return [wpGlobalStylesheet, omit(result, ['data'])];
};

export default useWp;

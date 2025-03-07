/**
 * useWp hook. Query to retrieve WordPress global stylesheet.
 */

import { gql, useQuery, QueryResult } from '@apollo/client';
import { omit, String } from 'lodash';

// TODO: Figure out why this is needed
import '@assets/css/wordpress.css';

const QUERY_WP_CORE = gql`
	query WpCoreQuery {
		globalStylesheet: wpGlobalStylesheet
		stylesheetDirectoryUri: wpStylesheetDirectoryUri
	}
`;

interface WpCoreQueryResult {
	globalStylesheet?: string;
	stylesheetDirectoryUri?: string;
}

/**
 * Query to retrieve WordPress global stylesheet.
 *
 * @returns A tuple of the stylesheet string and a query result object.
 */
const useWp = (): [WpCoreQueryResult, Omit<QueryResult<WpCoreQueryResult>, 'data'>] => {
	const result = useQuery<WpCoreQueryResult>(QUERY_WP_CORE);

	const { globalStylesheet = undefined, stylesheetDirectoryUri = undefined } = result.data || {};

	const wp = {
		globalStylesheet,
		stylesheetDirectoryUri,
	};

	return [wp, omit(result, ['data'])];
};

export default useWp;

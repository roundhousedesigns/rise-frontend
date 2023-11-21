/**
 * useFrontendSetting hook. Query to retrieve one User by database ID.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

const QUERY_FRONTEND_SETTING = gql`
	query FrontendSetting($key: String = "") {
		frontendSetting(key: $key)
	}
`;

/**
 * Query to retrieve a User ID by its slug (meta: `user_slug`)
 *
 * @param key An option value. Do not prepend with `<pod_name>_`.
 * @returns A tuple of a prepared data object and a query result object.
 */
const useFrontendSetting = (key: string) => {
	const result = useQuery(QUERY_FRONTEND_SETTING, {
		variables: {
			key: `frontend_settings_${key}`,
		},
	});

	const { frontendSetting } = result.data || {};

	return { value: frontendSetting, result: omit(result, ['data']) };
};

export default useFrontendSetting;

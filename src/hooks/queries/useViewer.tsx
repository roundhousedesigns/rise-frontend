/**
 * useViewer hook. Query information about the current logged in user.
 */

import { ViewerData } from '@/lib/types';
import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';

export const QUERY_VIEWER = gql`
	query QueryViewer {
		viewer {
			id: databaseId
			slug
			firstName
			lastName
			email
			username
			disableProfile
			starredProfiles(first: 100) {
				nodes {
					databaseId
				}
			}
		}
	}
`;

const useViewer = (): [ViewerData, any] => {
	const result = useQuery(QUERY_VIEWER);

	const {
		id: loggedInId,
		slug: loggedInSlug,
		firstName,
		lastName,
		email,
		username,
		disableProfile,
		starredProfiles: starredProfilesRaw,
	} = result?.data?.viewer || {};

	const starredProfiles =
		starredProfilesRaw?.nodes.map((node: { databaseId: number }) => node.databaseId) || [];

	return [
		{
			loggedInId,
			loggedInSlug,
			firstName,
			lastName,
			email,
			username,
			disableProfile,
			starredProfiles,
		},
		omit(result, ['data']),
	];
};

export default useViewer;

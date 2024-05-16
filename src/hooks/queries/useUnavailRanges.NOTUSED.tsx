/**
 * useUnavailRanges hook. Query to retrieve Users by ID.
 */

// TODO Do we need this hook?

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { prepareUnavailDatesFromGQLNodes } from '@lib/utils';
import useViewer from '@hooks/queries/useViewer';

export const QUERY_UNAVAIL_RANGES = gql`
	query QueryUnavailRanges($author: Int!) {
		unavailRanges(where: { author: $author }) {
			nodes {
				id: databaseId
				startDate
				endDate
			}
		}
	}
`;

export default function useUnavailRanges() {
	const { loggedInId } = useViewer();
	const result = useQuery(QUERY_UNAVAIL_RANGES, {
		variables: {
			author: loggedInId,
		},
	});

	// Prepare the unavailable dates
	const unavailRanges = result.data?.unavailRanges.nodes
		? prepareUnavailDatesFromGQLNodes(result.data.unavailRanges.nodes)
		: [];

	return [unavailRanges, omit(result, ['data'])];
}

/**
 * useCandidates hook. Query to retrieve Users by ID.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { Candidate } from '@lib/classes';
import { CandidateData } from '@lib/types';

export const QUERY_CANDIDATES = gql`
	query QueryCandidates($include: [Int!]!) {
		users(where: { include: $include }, first: 1000) {
			nodes {
				id: databaseId
				firstName
				lastName
				selfTitle
				image
				slug
			}
		}
	}
`;

/**
 * useCandidates hook.
 *
 * @param include_ids  An array of candidate IDs to include in the query.
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
export default function useCandidates(include_ids?: number[]): [Candidate[], any] {
	let include = include_ids && include_ids.length > 0 ? include_ids : [];
	const result = useQuery(QUERY_CANDIDATES, {
		variables: {
			include,
		},
		fetchPolicy: 'cache-first',
	});

	const preparedCandidates: Candidate[] = [];
	result.data?.users?.nodes?.forEach((candidate: CandidateData) => {
		const id = Number(candidate.id);
		preparedCandidates.push(new Candidate({ ...candidate, id }));
	});

	return [preparedCandidates, omit(result, ['data'])];
}

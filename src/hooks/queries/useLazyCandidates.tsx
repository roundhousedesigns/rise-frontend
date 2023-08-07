/**
 * useLazyCandidates hook. Lazy query to retrieve Users by ID.
 */

import { gql, LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';
import { omit } from 'lodash';
import { Candidate } from '../../lib/classes';
import { CandidateData } from '../../lib/types';
import { QUERY_POSITION_TERMS } from './usePositions';

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
 * useLazyCandidates hook.
 *
 * Queries `position` terms.
 *
 * @returns {Array} A tuple of the query exec function, prepared data object, and a modified query result object.
 */
export default function useLazyCandidates(): [LazyQueryExecFunction<any, any>, QueryResult, {}] {
	const [queryCandidates, result] = useLazyQuery(QUERY_POSITION_TERMS);

	const preparedCandidates = result.data?.users?.nodes?.map((candidate: CandidateData) => {
		const id = Number(candidate.id);
		return new Candidate({ ...candidate, id });
	});

	return [queryCandidates, preparedCandidates, omit(result, ['data'])];
}

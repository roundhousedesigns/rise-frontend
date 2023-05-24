/**
 * useCandidates hook. Query to retrieve Users by ID.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { Candidate } from '../../lib/classes';
import { CandidateData } from '../../lib/types';

const QUERY_USERS = gql`
	query QueryCandidates($include: [Int!]!) {
		users(where: { include: $include }) {
			nodes {
				id: databaseId
				firstName
				lastName
				selfTitle
				image(format: RAW)
			}
		}
	}
`;

export const useCandidates = (include_ids: number[]) => {
	let include = include_ids && include_ids.length > 0 ? include_ids : [0];
	const result = useQuery(QUERY_USERS, {
		variables: {
			include: include,
		},
	});

	const preparedCandidates = result.data?.users?.nodes?.map((candidate: CandidateData) => {
		const id = Number(candidate.id);
		return new Candidate({ ...candidate, id });
	});

	return [preparedCandidates, omit(result, ['data'])];
};

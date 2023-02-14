/**
 * useCandidates hook. Query to retrieve Users by ID.
 */

import { gql, useQuery } from '@apollo/client';
import { Candidate } from '../../lib/classes';
import { CandidateData } from '../../lib/types';

const QUERY_CANDIDATES = gql`
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

export const useCandidates = ($include: number[]) => {
	const result = useQuery(QUERY_CANDIDATES, {
		variables: {
			include: $include,
		},
	});

	const preparedCandidates = result.data?.users?.nodes?.map((candidate: CandidateData) => {
		const id = Number(candidate.id);
		return new Candidate({ ...candidate, id });
	});

	return { result, preparedCandidates };
};

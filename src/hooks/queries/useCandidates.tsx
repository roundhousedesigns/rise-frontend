import { gql, useQuery } from '@apollo/client';
import { useRef, useEffect } from 'react';
import { isEqual, omit } from 'lodash';
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

// TODO Smarten up this query so it doesn't rerender all the time.

export default function useCandidates(include: number[]): [Candidate[], any] {
	const previousIncludeIds = useRef<number[] | undefined>(include);

	useEffect(() => {
		if (!isEqual(include, previousIncludeIds.current)) {
			previousIncludeIds.current = include;
		}
	}, [include]);

	const result = useQuery(QUERY_CANDIDATES, {
		variables: {
			include: include,
		},
		fetchPolicy: 'cache-first',
		skip: !include.length,
	});

	const preparedCandidates: Candidate[] = [];

	const dataToUse = result.data || result.previousData;
	dataToUse?.users?.nodes.forEach((candidate: CandidateData) => {
		const id = Number(candidate.id);
		preparedCandidates.push(new Candidate({ ...candidate, id }));
	});

	return [preparedCandidates, omit(result, ['data'])];
}

import { List, ListItem, Text } from '@chakra-ui/react';
import { Candidate } from '../../lib/classes';

import CandidateItem from './CandidateItem';

import { useCandidates } from '../../hooks/queries/useCandidates';
import ErrorAlert from './ErrorAlert';

interface Props {
	userIds: number[];
}

// TODO Set up search results pagination in GraphQL

export default function CandidateList({ userIds }: Props): JSX.Element {
	const {
		result: { loading, error },
		preparedCandidates,
	} = useCandidates(userIds);

	return preparedCandidates && !loading && !error ? (
		<List alignItems='left' height='auto' width='full' gap={4} display='flex' flexWrap='wrap'>
			{preparedCandidates.map((candidate: Candidate) => (
				<ListItem key={candidate.id} width='full'>
					<CandidateItem candidate={candidate} />
				</ListItem>
			))}
		</List>
	) : loading ? (
		<Text>Loading...</Text>
	) : error ? (
		<ErrorAlert message={error.message} />
	) : (
		<Text>No candidates to show.</Text>
	);
}

import { Container, List, ListItem, Text } from '@chakra-ui/react';
import { Candidate } from '../../lib/classes';

import CandidateItem from './CandidateItem';

import { useCandidates } from '../../hooks/queries/useCandidates';

interface Props {
	userIds: number[];
}

export default function CandidateList({ userIds }: Props): JSX.Element {
	const {
		result: { loading, error },
		preparedCandidates,
	} = useCandidates(userIds);

	return preparedCandidates ? (
		<Container width='full'>
			<Text fontSize='sm' pb={2}>
				{/* TODO Set up search results pagination in GraphQL */}
				Showing X of Y search results.
			</Text>
			<List alignItems='left' height='auto' width='full' gap={4} display='flex' flexWrap='wrap'>
				{preparedCandidates.map((candidate: Candidate) => (
					<ListItem key={candidate.id} width='full'>
						<CandidateItem candidate={candidate} />
					</ListItem>
				))}
			</List>
		</Container>
	) : (
		<Text>No candidates to show.</Text>
	);
}

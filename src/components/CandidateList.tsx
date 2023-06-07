import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Candidate } from '../lib/classes';
import CandidateItem from './CandidateItem';
import useCandidates from '../hooks/queries/useCandidates';
import ErrorAlert from './common/ErrorAlert';

interface Props {
	userIds: number[];
}

// TODO Set up search results pagination in GraphQL

export default function CandidateList({ userIds }: Props): JSX.Element {
	const [preparedCandidates, { loading, error }] = useCandidates(userIds);

	return preparedCandidates && !loading && !error ? (
		<List alignItems='left' h='auto' w='full' gap={4} display='flex' flexWrap='wrap'>
			{preparedCandidates.map((candidate: Candidate) => (
				<ListItem key={candidate.id} w='full'>
					<CandidateItem candidate={candidate} />
				</ListItem>
			))}
		</List>
	) : loading ? (
		<Spinner />
	) : error ? (
		<ErrorAlert message={error.message} />
	) : (
		<Text>No candidates to show.</Text>
	);
}

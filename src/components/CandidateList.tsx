import { useMemo } from 'react';
import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Candidate } from '../lib/classes';
import CandidateItem from './CandidateItem';
import useCandidates from '../hooks/queries/useCandidates';
import ErrorAlert from './common/ErrorAlert';

interface Props {
	userIds: number[];
}

const CandidateList = ({ userIds }: Props): JSX.Element => {
	const [preparedCandidates, { loading, error }] = useCandidates(userIds);
	const memoizedCandidates = useMemo(
		() => preparedCandidates,
		[preparedCandidates?.map((candidate: Candidate) => candidate.id)]
	);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : memoizedCandidates ? (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					{preparedCandidates.map((candidate: Candidate) => (
						<ListItem key={candidate.id}>
							<CandidateItem candidate={candidate} />
						</ListItem>
					))}
				</List>
			) : (
				<Text>No candidates to show.</Text>
			)}
		</>
	);
};

export default CandidateList;

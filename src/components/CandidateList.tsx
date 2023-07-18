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
	const candidateList = useMemo((): number[] => {
		if (!preparedCandidates) return [];

		return preparedCandidates.map((candidate: Candidate) => (
			<ListItem key={candidate.id}>
				<CandidateItem candidate={candidate} />
			</ListItem>
		));
	}, [preparedCandidates]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : candidateList ? (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					{candidateList}
				</List>
			) : (
				<Text>No candidates to show.</Text>
			)}
		</>
	);
};

export default CandidateList;

import { useMemo } from 'react';
import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Candidate } from '@lib/classes';
import useCandidates from '@hooks/queries/useCandidates';
import CandidateItem from '@components/CandidateItem';
import ErrorAlert from '@common/ErrorAlert';

interface Props {
	userIds: number[];
	inOrder?: boolean;
}

const CandidateList = ({ userIds, inOrder }: Props): JSX.Element => {
	const [preparedCandidates, { loading, error }] = useCandidates(userIds);

	const memoizedCandidates = useMemo(() => {
		if (!userIds.length || !preparedCandidates?.length) return [];

		if (inOrder) {
			return userIds.map((id) => preparedCandidates.find((candidate) => candidate.id === id));
		}

		return preparedCandidates;
	}, [preparedCandidates?.map((candidate) => candidate.id), inOrder]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : memoizedCandidates ? (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					{memoizedCandidates.map((candidate: Candidate | undefined) => {
						if (!candidate) return false;
						const { id } = candidate;

						return id ? (
							<ListItem key={id}>
								<CandidateItem candidate={candidate} />
							</ListItem>
						) : (
							false
						);
					})}
				</List>
			) : (
				<Text>No candidates to show.</Text>
			)}
		</>
	);
};

export default CandidateList;

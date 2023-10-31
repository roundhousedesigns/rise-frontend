import { useMemo } from 'react';
import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Candidate } from '@lib/classes';
import useCandidates from '@hooks/queries/useCandidates';
import CandidateItem from './CandidateItem';
import ErrorAlert from '@common/ErrorAlert';

interface Props {
	userIds: number[];
	inOrder?: boolean;
}

const CandidateList = ({ userIds, inOrder }: Props): JSX.Element => {
	const [preparedCandidates, { loading, error }] = useCandidates(userIds);

	const memoizedCandidates = useMemo(() => {
		if (!userIds.length) return [];
		if (!preparedCandidates || !preparedCandidates.length) return [];
		if (!inOrder) return preparedCandidates;

		// Sort the array of Candidate objects by the order of the IDs in the userIds array.
		return userIds.map((id): Candidate[] =>
			preparedCandidates.find((candidate: Candidate) => candidate.id === id)
		);
	}, [preparedCandidates?.map((candidate: Candidate) => candidate.id)]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : memoizedCandidates ? (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					{memoizedCandidates.map((candidate: Candidate) => {
						const { id } = candidate || {};

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

import { useState, MouseEvent } from 'react';
import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Candidate } from '../lib/classes';
import useCandidates from '../hooks/queries/useCandidates';
import useViewer from '../hooks/queries/useViewer';
import CandidateItem from '../components/CandidateItem';
import ErrorAlert from '../components/common/ErrorAlert';
import useUpdateBookmarkedProfiles from '../hooks/mutations/useUpdateBookmarkedProfiles';

const SavedCandidateList = (): JSX.Element => {
	const { loggedInId, bookmarkedProfiles } = useViewer();
	const [preparedCandidates, { loading, error }] = useCandidates(bookmarkedProfiles);
	const [preparedCandidateIds, setPreparedCandidateIds] = useState<number[]>([]);
	const { updateBookmarkedProfilesMutation } = useUpdateBookmarkedProfiles();

	// set the preparedCandidateIds state to the bookmarkedProfiles array
	// this will be used to render the CandidateItem components
	if (bookmarkedProfiles.length > 0 && preparedCandidateIds.length === 0) {
		setPreparedCandidateIds(bookmarkedProfiles);
	}

	const removeHandler = (id: number) => (event: MouseEvent<HTMLButtonElement>) => {
		const updatedCandidateIds = preparedCandidateIds.filter(
			(candidateId: number) => candidateId !== id
		);

		setPreparedCandidateIds(updatedCandidateIds);

		// Fire off the mutation.
		updateBookmarkedProfilesMutation(loggedInId, updatedCandidateIds);
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : preparedCandidates ? (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					{preparedCandidateIds?.map((id: number) => {
						// get the candidate from the preparedCandidates array
						const candidate = preparedCandidates.find(
							(candidate: Candidate) => candidate.id === id
						);

						return (
							<ListItem key={id}>
								<CandidateItem candidate={candidate} onRemove={removeHandler} />
							</ListItem>
						);
					})}
				</List>
			) : (
				<Text>No candidates to show.</Text>
			)}
		</>
	);
};

export default SavedCandidateList;

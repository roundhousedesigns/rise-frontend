import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
import { chakra, List, ListItem, Spinner } from '@chakra-ui/react';
import { Candidate } from '../lib/classes';
import useCandidates from '../hooks/queries/useCandidates';
import useViewer from '../hooks/queries/useViewer';
import CandidateItem from '../components/CandidateItem';
import ErrorAlert from '../components/common/ErrorAlert';
import useUpdateBookmarkedProfiles from '../hooks/mutations/useUpdateBookmarkedProfiles';

const SavedCandidateList = ({ ...props }: { [prop: string]: any }): JSX.Element => {
	const { loggedInId, bookmarkedProfiles } = useViewer();
	const [preparedCandidates, { error, loading }] = useCandidates(bookmarkedProfiles);
	const { updateBookmarkedProfilesMutation } = useUpdateBookmarkedProfiles();

	const preparedCandidateIds = useRef<number[]>([]);

	useEffect(() => {
		if (isEqual(preparedCandidateIds.current, bookmarkedProfiles)) return;

		preparedCandidateIds.current = bookmarkedProfiles;
	}, [bookmarkedProfiles, preparedCandidateIds.current]);

	const removeHandler = (id: number) => () => {
		// Fire off the mutation.
		updateBookmarkedProfilesMutation(loggedInId, preparedCandidateIds.current).then((res) => {
			preparedCandidateIds.current = preparedCandidateIds.current.filter(
				(candidateId: number) => candidateId !== id
			);
		});
	};

	return (
		<chakra.div {...props}>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : preparedCandidates?.length ? (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					{preparedCandidateIds.current?.map((id: number, index: number) => {
						// Find the candidate in the preparedCandidates array
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
				false
			)}
		</chakra.div>
	);
};

export default SavedCandidateList;

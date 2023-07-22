import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Candidate } from '../lib/classes';
import useCandidates from '../hooks/queries/useCandidates';
import useViewer from '../hooks/queries/useViewer';
import CandidateItem from '../components/CandidateItem';
import ErrorAlert from '../components/common/ErrorAlert';

const SavedCandidateList = (): JSX.Element => {
	const { bookmarkedProfiles } = useViewer();
	const [preparedCandidates, { loading, error }] = useCandidates(bookmarkedProfiles);
	// const memoizedCandidates = useMemo(
	// 	() => preparedCandidates,
	// 	[preparedCandidates?.map((candidate: Candidate) => candidate.id)]
	// );

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : preparedCandidates ? (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					{preparedCandidates.map((candidate: Candidate) => {
						const id = candidate.id ? candidate.id : 0;
						return (
							<ListItem key={id}>
								<CandidateItem candidate={candidate} removeItem={true} />
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

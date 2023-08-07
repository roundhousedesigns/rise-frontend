import { chakra, List, ListItem, Spinner } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import useCandidates from '../hooks/queries/useCandidates';
import useViewer from '../hooks/queries/useViewer';
import CandidateItem from '../components/CandidateItem';
import ErrorAlert from '../components/common/ErrorAlert';
import useUpdateBookmarkedProfiles from '../hooks/mutations/useUpdateBookmarkedProfiles';
import { Candidate } from '../lib/classes';
import { toggleArrayItem } from '../lib/utils';

const MotionBox = motion(chakra.div);

const SavedCandidateList = ({ ...props }: { [prop: string]: any }): JSX.Element => {
	const { loggedInId, bookmarkedProfiles } = useViewer();
	const [preparedCandidates, { error, loading }] = useCandidates(bookmarkedProfiles);
	const { updateBookmarkedProfilesMutation } = useUpdateBookmarkedProfiles();

	const removeHandler = (id: number) => () => {
		const ids = toggleArrayItem(bookmarkedProfiles, id);

		// Fire off the mutation.
		updateBookmarkedProfilesMutation(loggedInId, ids);
	};

	return (
		<chakra.div {...props}>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					<AnimatePresence>
						{' '}
						{/* Wrap the list with AnimatePresence */}
						{bookmarkedProfiles?.map((id) => {
							const candidate = preparedCandidates.find(
								(candidate: Candidate) => candidate.id === id
							);
							return (
								<MotionBox
									key={id}
									initial={{ opacity: 1 }} // Initial opacity of 1 (fully visible)
									animate={{ opacity: 1 }} // Animate to opacity of 1 (fully visible)
									exit={{ opacity: 0 }} // Animate to opacity of 0 (completely transparent)
								>
									<ListItem>
										<CandidateItem candidate={candidate} onRemove={removeHandler} />
									</ListItem>
								</MotionBox>
							);
						})}
					</AnimatePresence>
				</List>
			)}
		</chakra.div>
	);
};

export default SavedCandidateList;

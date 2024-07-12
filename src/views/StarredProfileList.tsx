import { chakra, List, ListItem } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Candidate } from '@lib/classes';
import { toggleArrayItem } from '@lib/utils';
import useCandidates from '@hooks/queries/useCandidates';
import useViewer from '@hooks/queries/useViewer';
import CandidateItem from '@components/CandidateItem';
import ErrorAlert from '@common/ErrorAlert';
import useUpdateStarredProfiles from '@hooks/mutations/useUpdateStarredProfiles';

const MotionBox = motion(chakra.div);

// TODO Something's wrong with removal animation. Entire collection flashes.

export default function StarredProfileList({ ...props }: { [prop: string]: any }): JSX.Element {
	const { starredProfiles } = useViewer();
	const [profiles, { error }] = useCandidates(starredProfiles);
	const { updateStarredProfilesMutation } = useUpdateStarredProfiles();

	const removeHandler = (id: number) => () => {
		const ids = toggleArrayItem(starredProfiles, id);

		// Fire off the mutation.
		updateStarredProfilesMutation(ids);
	};

	return (
		<chakra.div {...props}>
			{error ? (
				<ErrorAlert message={error.message} />
			) : (
				<List alignItems='left' h='auto' mt={2} w='full' spacing={4}>
					{/* TODO move this into <CandidateList /> to DRY yourself off */}
					<AnimatePresence>
						{starredProfiles.map((id) => {
							const candidate = profiles.find((candidate: Candidate) => candidate.id === id);

							if (!candidate) return null;

							return (
								<MotionBox
									key={id.toString()}
									initial={{ opacity: 1 }} // Initial opacity of 1 (fully visible)
									animate={{ opacity: 1 }} // Animate to opacity of 1 (fully visible)
									exit={{ opacity: 0 }} // Animate to opacity of 0 (completely transparent)
								>
									<CandidateItem as={ListItem} candidate={candidate} onRemove={removeHandler} />
								</MotionBox>
							);
						})}
					</AnimatePresence>
				</List>
			)}
		</chakra.div>
	);
}

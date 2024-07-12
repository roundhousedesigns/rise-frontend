import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
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

export default function StarredCandidateList({ ...props }: { [prop: string]: any }): JSX.Element {
	const { loggedInId, starredProfiles } = useViewer();
	const [preparedCandidates, { error }] = useCandidates(starredProfiles);
	const { updateStarredProfilesMutation } = useUpdateStarredProfiles();

	const preparedCandidateIds = useRef<number[]>(starredProfiles);

	useEffect(() => {
		if (isEqual(preparedCandidateIds.current, starredProfiles)) return;

		preparedCandidateIds.current = starredProfiles;
	}, [starredProfiles, preparedCandidateIds.current]);

	const removeHandler = (id: number) => () => {
		const ids = toggleArrayItem(starredProfiles, id);

		// Fire off the mutation.
		updateStarredProfilesMutation(loggedInId, ids).then((res) => {
			preparedCandidateIds.current = ids;
		});
	};

	return (
		<chakra.div {...props}>
			{error ? (
				<ErrorAlert message={error.message} />
			) : preparedCandidates ? (
				<List alignItems='left' h='auto' mt={2} w='full' spacing={4}>
					{/* TODO move this into <CandidateList /> to DRY yourself off */}
					<AnimatePresence>
						{preparedCandidateIds.current?.map((id) => {
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
									<CandidateItem as={ListItem} candidate={candidate} onRemove={removeHandler} />
								</MotionBox>
							);
						})}
					</AnimatePresence>
				</List>
			) : (
				false
			)}
		</chakra.div>
	);
}

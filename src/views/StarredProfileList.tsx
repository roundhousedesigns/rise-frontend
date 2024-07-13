import { chakra, List, ListItem } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Candidate } from '@lib/classes';
import useCandidates from '@hooks/queries/useCandidates';
import useViewer from '@hooks/queries/useViewer';
import useUpdateStarredProfiles from '@hooks/mutations/useUpdateStarredProfiles';
import CandidateItem from '@components/CandidateItem';
import ErrorAlert from '@common/ErrorAlert';
import { useEffect, useRef, useState } from 'react';

// const MotionBox = motion(chakra.div);

// TODO Something's wrong with removal animation. Entire collection flashes.

export default function StarredProfileList({ ...props }: { [prop: string]: any }): JSX.Element {
	const { starredProfiles } = useViewer();
	const [profiles, { error }] = useCandidates(starredProfiles);
	const { updateStarredProfilesMutation } = useUpdateStarredProfiles();

	const starredProfileRef = useRef<number[]>(starredProfiles);

	useEffect(() => {
		starredProfileRef.current = starredProfiles;
	}, [starredProfiles]);

	const removeHandler = (id: number) => {
		updateStarredProfilesMutation(id);
	};

	return (
		<chakra.div {...props}>
			{error ? (
				<ErrorAlert message={error.message} />
			) : (
				// HACK spacing is 0 so we can use individual elements, becuase of
				// unmount failure issue
				<List alignItems='left' h='auto' mt={2} w='full' /*spacing={4}*/ spacing={0}>
					{/* TODO move this into <CandidateList /> to DRY yourself off */}
					<AnimatePresence>
						{starredProfileRef.current.map((id) => {
							const candidate = profiles.find((candidate: Candidate) => candidate.id === id);

							if (!candidate) return null;

							return (
								<ListItem
									key={id}
									as={motion.li}
									mb={4}
									initial={{ opacity: 0 }} // Initial state before animation
									animate={{ opacity: 1 }} // Animation state
									exit={{ opacity: 0 }} // Exit state
								>
									<CandidateItem candidate={candidate} onRemove={removeHandler} />
								</ListItem>
							);
						})}
					</AnimatePresence>
				</List>
			)}
		</chakra.div>
	);
}

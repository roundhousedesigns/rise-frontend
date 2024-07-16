import { useEffect, useRef } from 'react';
import { chakra, List, ListItem, Spinner } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { isEqual } from 'lodash';
import { Candidate } from '@lib/classes';
import useCandidates from '@hooks/queries/useCandidates';
import useViewer from '@hooks/queries/useViewer';
import ErrorAlert from '@common/ErrorAlert';
import CandidateItem from '@components/CandidateItem';

// FIXME Entire collection flashes when an item is removed.

export default function StarredProfileList({ ...props }: { [prop: string]: any }): JSX.Element {
	const { starredProfiles } = useViewer();
	const [profiles, { error, loading }] = useCandidates(starredProfiles ? starredProfiles : []);

	const profilesRef = useRef<number[] | undefined>(starredProfiles);

	useEffect(() => {
		if (!isEqual(profilesRef.current, starredProfiles)) {
			profilesRef.current = starredProfiles;
		}

		return () => {
			profilesRef.current = undefined;
		};
	}, [starredProfiles]);

	return (
		<chakra.div {...props}>
			{!error && !loading ? (
				<List alignItems='left' h='auto' mt={2} w='full' spacing={4}>
					{/* TODO move this into <CandidateList /> to DRY yourself off */}
					<AnimatePresence>
						{profilesRef.current?.map((id: number) => {
							const profile = profiles.find((profile: Candidate) => profile.id === id);

							if (!profile) return null;

							return (
								<ListItem
									key={id}
									as={motion.li}
									initial={{ opacity: 0 }} // Initial state before animation
									animate={{ opacity: 1 }} // Animation state
									exit={{ opacity: 0 }} // Exit state
								>
									<CandidateItem candidate={profile} />
								</ListItem>
							);
						})}
					</AnimatePresence>
				</List>
			) : loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : (
				<></>
			)}
		</chakra.div>
	);
}

import { chakra, Text, Container } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchFilterSet, WPPost } from '@lib/classes';
import useSavedSearches from '@hooks/queries/useSavedSearches';
import SavedSearchItem from '@components/SavedSearchItem';

interface Props {
	[prop: string]: any;
}

export default function SavedSearchItemList({ ...props }: Props) {
	const [savedSearches] = useSavedSearches();
	const MotionBox = motion(chakra.div);

	// TODO Maintain indexes when editing a saved search's name.

	return (
		<chakra.div {...props}>
			{savedSearches && savedSearches.length > 0 ? (
				<Container ml={0} mx='auto' px={0} maxW='4xl'>
					<AnimatePresence>
						{savedSearches.map((savedSearch: WPPost) => {
							const { id, content, title } = savedSearch;
							if (!content) {
								return;
							}

							const json = JSON.parse(content);
							const filters = new SearchFilterSet(json);

							return (
								<MotionBox
									key={id}
									initial={{ opacity: 1 }} // Initial opacity of 1 (fully visible)
									animate={{ opacity: 1 }} // Animate to opacity of 1 (fully visible)
									exit={{ opacity: 0 }} // Animate to opacity of 0 (completely transparent)
								>
									<SavedSearchItem searchTerms={filters} title={title} id={id} />
								</MotionBox>
							);
						})}
					</AnimatePresence>
				</Container>
			) : (
				<Text fontSize='sm'>No saved searches.</Text>
			)}
		</chakra.div>
	);
}

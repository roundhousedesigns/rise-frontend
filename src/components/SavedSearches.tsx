import { Text, Card, Flex, chakra } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import SavedSearchItem from '@common/SavedSearchItem';
import useSavedSearches from '@/hooks/queries/useSavedSearches';
import { WPPost } from '@/lib/classes';

export default function SavedSearchItems() {
	const [savedSearches] = useSavedSearches();
	const MotionBox = motion(chakra.div);

	return (
		<>
			{savedSearches && savedSearches.length > 0 ? (
				<Flex gap={4} flexWrap='wrap' justifyContent='space-between' position='relative'>
					<AnimatePresence>
						{savedSearches.map((savedSearch: WPPost) => {
							const { id, content, title } = savedSearch;
							if (!content) {
								return;
							}

							const filters = JSON.parse(content);

							return (
								<MotionBox
									key={id}
									initial={{ opacity: 1 }} // Initial opacity of 1 (fully visible)
									animate={{ opacity: 1 }} // Animate to opacity of 1 (fully visible)
									exit={{ opacity: 0 }} // Animate to opacity of 0 (completely transparent)
									flex='1'
									flexBasis={{ base: '100%', md: '49%' }}
								>
									<Card
										my={0}
										py={2}
										maxWidth='half'
										_dark={{ bgColor: 'gray.800' }}
										_light={{ bgColor: 'gray.50' }}
									>
										<SavedSearchItem searchTerms={filters} title={title} id={id} />
									</Card>
								</MotionBox>
							);
						})}
					</AnimatePresence>
				</Flex>
			) : (
				<Text fontSize='sm'>No saved searches.</Text>
			)}
		</>
	);
}

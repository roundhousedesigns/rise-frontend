import { chakra, Text, Card, Stack, Container } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { WPPost } from '@/lib/classes';
import useSavedSearches from '@/hooks/queries/useSavedSearches';
import SavedSearchItem from '@common/SavedSearchItem';

interface Props {
	[prop: string]: any;
}

export default function SavedSearchItems({ ...props }: Props) {
	const [savedSearches] = useSavedSearches();
	const MotionBox = motion(chakra.div);

	return (
		<chakra.div {...props}>
			{savedSearches && savedSearches.length > 0 ? (
				<Container ml={0} pl={0} maxW='4xl'>
					<Stack gap={4} justifyContent='space-between' position='relative'>
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
										flex='0 1 auto'
										flexBasis={{ base: '100%', md: '49%' }}
									>
										<Card
											my={0}
											py={2}
											px={3}
											maxWidth='half'
											_dark={{ bgColor: 'gray.800' }}
											_light={{ bgColor: 'gray.100' }}
										>
											<SavedSearchItem searchTerms={filters} title={title} id={id} />
										</Card>
									</MotionBox>
								);
							})}
						</AnimatePresence>
					</Stack>
				</Container>
			) : (
				<Text fontSize='sm'>No saved searches.</Text>
			)}
		</chakra.div>
	);
}

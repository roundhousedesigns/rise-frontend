import { chakra, Text, Flex, useBreakpointValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchFilterSet, WPPost } from '@lib/classes';
import useSavedSearches from '@hooks/queries/useSavedSearches';
import SavedSearchItem from '@components/SavedSearchItem';

interface Props {
	[prop: string]: any;
}

export default function SavedSearchItemList({ ...props }: Props) {
	const [savedSearches] = useSavedSearches();

	const isLargerThanMd = useBreakpointValue(
		{
			base: false,
			md: true,
		},
		{ ssr: false }
	);

	// TODO Maintain indexes when editing a saved search's name.

	return (
		<chakra.div {...props}>
			{savedSearches && savedSearches.length > 0 ? (
				<Flex ml={0} px={0} maxW='4xl' justify-content='center' gap={2} flexWrap='wrap'>
					<AnimatePresence>
						{savedSearches.map((savedSearch: WPPost, index: number) => {
							const { id, content, title } = savedSearch;
							if (!content) {
								return;
							}

							const even = index % 2 === 0;

							const json = JSON.parse(content);
							const filters = new SearchFilterSet(json);

							return (
								<SavedSearchItem
									as={motion.div}
									key={id}
									initial={{ opacity: 1 }} // Initial opacity of 1 (fully visible)
									animate={{ opacity: 1 }} // Animate to opacity of 1 (fully visible)
									exit={{ opacity: 0 }} // Animate to opacity of 0 (completely transparent)
									flex='0 1 450px'
									searchTerms={filters}
									title={title}
									id={id}
									_light={{
										bgColor: !isLargerThanMd && even ? 'blackAlpha.200' : 'blackAlpha.50',
									}}
									_dark={{
										bgColor: !isLargerThanMd && even ? 'whiteAlpha.200' : 'whiteAlpha.50',
									}}
								/>
							);
						})}
					</AnimatePresence>
				</Flex>
			) : (
				<Text fontSize='sm'>No saved searches.</Text>
			)}
		</chakra.div>
	);
}

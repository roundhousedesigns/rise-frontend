import { memo, useMemo } from 'react';
import { chakra, Flex, useBreakpointValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchFilterSet, WPPost } from '@lib/classes';
import useSavedSearches from '@queries/useSavedSearches';
import SavedSearchItem from '@components/SavedSearchItem';
import { ParsedSearch } from '@/lib/types';

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

	const SavedSearchItemMemo = memo(SavedSearchItem);

	const parsedSearches: ParsedSearch[] = useMemo(() => {
		return savedSearches
			? (savedSearches
					.map((savedSearch: WPPost) => {
						const { id, title, content } = savedSearch;

						if (!content) {
							return null;
						}

						const json = JSON.parse(content);
						const filters = new SearchFilterSet(json);

						return { id, title, filters };
					})
					.filter(Boolean) as ParsedSearch[])
			: [];
	}, [savedSearches]);

	return (
		<chakra.div {...props}>
			{parsedSearches.length > 0 ? (
				<Flex ml={0} px={0} maxW={'4xl'} justify-content={'center'} gap={2} flexWrap={'wrap'}>
					<AnimatePresence>
						{parsedSearches.map(({ id, title, filters }) => {
							return (
								<SavedSearchItemMemo
									as={motion.div}
									key={id}
									initial={{ opacity: 1 }} // Initial opacity of 1 (fully visible)
									animate={{ opacity: 1 }} // Animate to opacity of 1 (fully visible)
									exit={{ opacity: 0 }} // Animate to opacity of 0 (completely transparent)
									flex={'0 1 450px'}
									searchTerms={filters}
									title={title}
									id={id}
									_light={{
										bgColor: !isLargerThanMd && id % 2 === 0 ? 'blackAlpha.200' : 'blackAlpha.50',
									}}
								/>
							);
						})}
					</AnimatePresence>
				</Flex>
			) : null}
		</chakra.div>
	);
}

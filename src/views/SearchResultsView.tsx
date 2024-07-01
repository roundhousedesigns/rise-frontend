import { useContext, useMemo } from 'react';
import { Card, Flex, IconButton, Text } from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';
import { SearchContext } from '@context/SearchContext';
import TextCenterline from '@common/TextCenterline';
import SavedSearchItem from '@components/SavedSearchItem';
import CandidateList from '@components/CandidateList';
import useSavedSearches from '@hooks/queries/useSavedSearches';

export default function SearchResultsView() {
	const {
		search: {
			filters: { filterSet },
			results,
			savedSearch: { id: savedSearchId },
		},
	} = useContext(SearchContext);

	const { jobDates } = filterSet;
	const resultsCount = results.length;

	const [savedSearches] = useSavedSearches();
	const savedSearchTitle = savedSearches?.find((search) => search.id === savedSearchId)?.title;

	/**
	 * Set the results string based on the number of results.
	 */
	const resultsString = () => {
		return resultsCount === 0
			? 'No results'
			: resultsCount === 1
			? '1 result'
			: `${resultsCount} results`;
	};

	const orderedResults: number[] = useMemo(() => {
		if (!resultsCount) return [];

		// Sort the results by score.
		const sortedResults = [...results].sort((a, b) => {
			return b.score - a.score;
		});

		return sortedResults.map((item) => Number(item.id));
	}, [results]);

	const ConflictDateLegend = () => {
		return jobDates && jobDates.startDate ? (
			<Flex justifyContent='flex-start' alignItems='center' gap={1} mb={4} mt={0} ml={12}>
				<IconButton
					icon={<FiCalendar />}
					variant='inline'
					title='Search'
					bgColor='red.300'
					color='text.dark'
					aria-label='Possible scheduling conflict'
					size='xs'
				/>
				<Text variant='helperText' fontSize='xs'>
					= Possible scheduling conflict
				</Text>
			</Flex>
		) : (
			<></>
		);
	};

	return (
		<>
			{savedSearchId ? (
				<Card maxW='50%'>
					<SavedSearchItem
						searchTerms={filterSet}
						id={savedSearchId}
						title={savedSearchTitle ? savedSearchTitle : undefined}
						showControls={false}
						showSaveButton
						width='100%'
					/>
				</Card>
			) : (
				false
			)}
			{resultsCount ? (
				<>
					<TextCenterline fontSize='xl'>{resultsString()}</TextCenterline>
					{jobDates && jobDates.startDate ? <ConflictDateLegend /> : false}
				</>
			) : (
				<Text fontSize='sm'>Your search results will appear here after you Search.</Text>
			)}

			<CandidateList userIds={orderedResults} inOrder={true} />

			{resultsCount > 100 ? (
				<Text fontSize='sm' mt={6} ml={16} pl={2} color='gray.500'>
					Only showing the first 100 results. Try refining your search!
				</Text>
			) : null}
		</>
	);
}

import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import { SearchContext } from '@context/SearchContext';
import useSavedSearches from '@queries/useSavedSearches';
import TextCenterline from '@common/TextCenterline';
import SavedSearchItem from '@components/SavedSearchItem';
import CandidateList from '@components/CandidateList';
import InlineIconText from '@components/InlineIconText';

export default function SearchResultsView() {
	const {
		search: {
			filters: { filterSet },
			results,
			savedSearch: { id: savedSearchId },
			searchWizardActive,
		},
	} = useContext(SearchContext);

	const { jobDates } = filterSet;

	const [resultsCount, setResultsCount] = useState<number>(results.length);
	const [savedSearches] = useSavedSearches(savedSearchId ? [savedSearchId] : []);
	const [savedSearchTitle, setSavedSearchTitle] = useState<string>('');

	/**
	 * Set the results count.
	 */
	useEffect(() => {
		setResultsCount(results.length);
	}, [results.length]);

	useEffect(() => {
		const title = savedSearches?.find((search) => search.id === savedSearchId)?.title;
		setSavedSearchTitle(title ? title : '');

		return () => {
			setSavedSearchTitle('');
		};
	}, [savedSearches, savedSearchId]);

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

		// Don't mess with state.
		const resultsForSort = [...results];

		// Sort the results by score.
		const sortedResults = resultsForSort.sort((a, b) => {
			const { score: aScore } = a;
			const { score: bScore } = b;

			return aScore - bScore;
		});

		return sortedResults.map((item) => Number(item.id));
	}, [resultsCount, results]);

	const ConflictDateLegend = () => {
		return jobDates && jobDates.startDate ? (
			<Flex justifyContent={'flex-start'} alignItems='center' gap={1} mb={4} mt={0} ml={12}>
				<InlineIconText
					text={'badge = Possible scheduling conflict'}
					icon={<FiCalendar />}
					query='badge'
					description={'Scheduling conflict'}
				/>
			</Flex>
		) : (
			<></>
		);
	};

	const SavedSearchItemMemo = memo(SavedSearchItem);

	return (
		<>
			{results.length > 0 ? (
				<Box w='auto' display={'inline-block'} mt={4} maxW='600px'>
					<SavedSearchItemMemo
						searchTerms={filterSet}
						id={savedSearchId ? savedSearchId : 0}
						title={savedSearchTitle || undefined}
						showControls={false}
						showSaveButton
						mb={1}
						width={'100%'}
					/>
					<Text variant='helperText' fontSize='2xs' m={0}>
						<Link as={RouterLink} to={'/searches'} m={0}>
							Manage your saved searches
						</Link>
					</Text>
				</Box>
			) : (
				false
			)}

			{resultsCount > 0 ? (
				<>
					<TextCenterline fontSize='xl'>{resultsString()}</TextCenterline>
					{jobDates && jobDates.startDate ? <ConflictDateLegend /> : false}
				</>
			) : resultsCount === 0 && searchWizardActive ? (
				<Text fontSize='sm'>No results.</Text>
			) : (
				<Text fontSize='sm'>Your search results will appear here after you Search.</Text>
			)}

			<CandidateList userIds={orderedResults} inOrder={true} />

			{resultsCount > 100 ? (
				<Text fontSize='sm' mt={6} ml={16} pl={2} color={'gray.500'}>
					Only showing the first 100 results. Try refining your search!
				</Text>
			) : null}
		</>
	);
}

import { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import { SearchContext } from '@context/SearchContext';
import useSavedSearches from '@hooks/queries/useSavedSearches';
import TextCenterline from '@common/TextCenterline';
import SavedSearchItem from '@components/SavedSearchItem';
import CandidateList from '@components/CandidateList';

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
	}, [results]);

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
					variant='sampleIconButton'
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
			{filterSet.positions.departments?.length || filterSet.positions.jobs?.length ? (
				<Box w='auto' display='inline-block' mt={4} maxW='600px'>
					<SavedSearchItem
						searchTerms={filterSet}
						id={savedSearchId ? savedSearchId : undefined}
						title={savedSearchTitle ? savedSearchTitle : undefined}
						showControls={false}
						showSaveButton
						mb={1}
						width='100%'
					/>
					<Text variant='helperText' fontSize='2xs' m={0}>
						<Link as={RouterLink} to='/searches' m={0}>
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
				<Text fontSize='sm' mt={6} ml={16} pl={2} color='gray.500'>
					Only showing the first 100 results. Try refining your search!
				</Text>
			) : null}
		</>
	);
}

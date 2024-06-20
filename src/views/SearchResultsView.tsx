import { useContext, useMemo } from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { prepareSearchFilterSetForSave } from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import TextCenterline from '@common/TextCenterline';
import SavedSearchItem from '@components/SavedSearchItem';
import CandidateList from '@components/CandidateList';
import { FiCalendar } from 'react-icons/fi';

export default function SearchResultsView() {
	const {
		search: {
			filters: { filterSet },
			results,
		},
	} = useContext(SearchContext);

	const { jobDates } = filterSet;

	const resultsCount = results.length;

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

	const Legend = () => {
		return jobDates && jobDates.startDate ? (
			<Flex alignItems='center' gap={1}>
				<IconButton
					icon={<FiCalendar />}
					variant='inline'
					title='Search'
					bgColor='brand.orange'
					aria-label='Sample magnifying glass search icon'
					size='xs'
				/>
				<Text variant='helperText' fontSize='sm'>
					Possible scheduling conflict
				</Text>
			</Flex>
		) : (
			false
		);
	};

	return (
		<>
			<SavedSearchItem searchTerms={prepareSearchFilterSetForSave(filterSet)} />
			{resultsCount ? (
				<>
					<TextCenterline fontSize='xl'>{resultsString()}</TextCenterline>
					{jobDates && jobDates.startDate ? (
						<Flex justifyContent='flex-start' alignItems='center' gap={1} mb={4} mt={0} ml={12}>
							<IconButton
								icon={<FiCalendar />}
								variant='inline'
								title='Search'
								bgColor='red.300'
								color='text.dark'
								aria-label='Sample magnifying glass search icon'
								size='xs'
							/>
							<Text variant='helperText' fontSize='sm'>
								Possible scheduling conflict
							</Text>
						</Flex>
					) : (
						false
					)}
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

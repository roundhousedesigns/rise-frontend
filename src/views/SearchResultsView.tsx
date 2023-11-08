import { useContext, useMemo } from 'react';
import { Container, Text } from '@chakra-ui/react';
import { flattenfilterSetPositions } from '@/lib/utils';
import { SearchContext } from '@context/SearchContext';
import TextCenterline from '@common/TextCenterline';
import SavedSearchItem from '@common/SavedSearchItem';
import CandidateList from '@components/CandidateList';

export default function SearchResultsView() {
	const {
		search: {
			searchActive,
			filters: { filterSet },
			results,
		},
	} = useContext(SearchContext);

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

	return (
		<>
			<SavedSearchItem searchTerms={flattenfilterSetPositions(filterSet)} />
			{searchActive ? (
				<TextCenterline fontSize='xl'>{resultsString()}</TextCenterline>
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

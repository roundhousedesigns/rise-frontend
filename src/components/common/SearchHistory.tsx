import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { UnorderedList, ListItem, Heading, Text } from '@chakra-ui/react';
import { extractSearchTermIds, getUniqueTermIdsFromString } from '../../lib/utils';
import { SearchContext } from '../../context/SearchContext';
import useViewer from '../../hooks/queries/useViewer';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';
import useCandidateSearch from '../../hooks/queries/useCandidateSearch';
import ReadableSearchString from './ReadableSearchString';

export default function SearchHistory() {
	const { loggedInId } = useViewer();
	const { searchHistory } = useViewer();
	const [getSearchResults, { data: { filteredCandidates } = [] }] = useCandidateSearch();
	const {
		search: { results },
		searchDispatch,
	} = useContext(SearchContext);

	const navigate = useNavigate();

	// Update SearchContext with the new results whenever the query returns.
	useEffect(() => {
		if (isEqual(filteredCandidates, results) || !filteredCandidates) return;

		searchDispatch({
			type: 'SET_RESULTS',
			payload: {
				results: filteredCandidates,
			},
		});
	}, [filteredCandidates]);

	const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const { search, userId } = event.currentTarget.dataset;

		if (!search || !userId) return;

		const searchObj = JSON.parse(search);
		searchObj.searchUserId = parseInt(userId);

		getSearchResults({
			variables: searchObj,
		})
			.then(() => {
				navigate('/results');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// Get all the term IDs from the params object.
	const termIds = getUniqueTermIdsFromString(searchHistory);
	const [terms] = useTaxonomyTerms(termIds);

	// Get the term IDs for each search.
	const searchHistoryArr = searchHistory ? JSON.parse(searchHistory) : [];
	const searches = searchHistoryArr
		? searchHistoryArr.map((search: object) => extractSearchTermIds(search))
		: [];

	return (
		<>
			<Heading as='h2' variant='pageSubtitle' color='white'>
				Your recent searches
			</Heading>
			{searches.length > 0 ? (
				<UnorderedList fontSize='lg' spacing={2}>
					{searches.map((search: number[], index: number) => {
						return (
							<ListItem
								key={index}
								data-search={JSON.stringify(searchHistoryArr[index])}
								data-user-id={loggedInId}
								onClick={handleClick}
								cursor='pointer'
							>
								<ReadableSearchString termIds={search} allTerms={terms} />
							</ListItem>
						);
					})}
				</UnorderedList>
			) : (
				<Text fontSize='sm'>No recent searches.</Text>
			)}
		</>
	);
}

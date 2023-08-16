import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, Heading, Text, IconButton, Flex, Box } from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiSearch } from 'react-icons/fi';
import { extractSearchTermIds, getUniqueTermIdsFromString } from '../../lib/utils';
import { SearchContext } from '../../context/SearchContext';
import useViewer from '../../hooks/queries/useViewer';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';
import useCandidateSearch from '../../hooks/queries/useCandidateSearch';
import ReadableSearchString from './ReadableSearchString';
import { WPItem } from '../../lib/classes';
import { SearchFilterSet } from '../../lib/types';

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

	// Get all the term IDs from the params object.
	const termIds = getUniqueTermIdsFromString(searchHistory);
	const [terms] = useTaxonomyTerms(termIds);
	var departmentId: WPItem;

	// TODO also set state on the search filters
	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const { search, userId } = event.currentTarget.dataset;

		if (!search || !userId) return;

		const searchObj = JSON.parse(search);

		// Get the term from `terms` that matches the first `position` in the search object.
		for (let term of terms) {
			if (term.id === Number(searchObj.positions[0])) {
				departmentId = term.parent.id;
				break;
			}
		}

		searchDispatch({
			type: 'RESTORE_FILTER_SET',
			payload: {
				filterSet: {
					...searchObj,
					positions: {
						department: departmentId.toString(),
						jobs: searchObj.positions,
					},
				},
			},
		});

		getSearchResults({
			variables: { ...searchObj, searchUserId: parseInt(userId) },
		})
			.then(() => {
				navigate('/results');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// Get the term IDs for each search.
	const searchHistoryArr = searchHistory ? JSON.parse(searchHistory) : [];
	const searches = searchHistoryArr
		? searchHistoryArr.map((search: SearchFilterSet) => extractSearchTermIds(search))
		: [];

	return (
		<Box>
			<Heading as='h2' variant='pageSubtitle' color='white'>
				Search History
			</Heading>
			<Text>Rerun your last {searches.length > 1 ? `${searches.length} searches` : 'search'}:</Text>
			{searches.length > 0 ? (
				<List spacing={2}>
					{searches.map((search: number[], index: number) => {
						return (
							<ListItem key={index}>
								<Flex alignItems='center' justifyContent='flex-start'>
									<IconButton
										icon={<FiSearch />}
										onClick={handleClick}
										data-search={JSON.stringify(searchHistoryArr[index])}
										data-user-id={loggedInId}
										aria-label={`Rerun this search`}
										size='sm'
										mr={2}
									/>
									<ReadableSearchString termIds={search} allTerms={terms} />
								</Flex>
							</ListItem>
						);
					})}
				</List>
			) : (
				<Text fontSize='sm'>No recent searches.</Text>
			)}
		</Box>
	);
}

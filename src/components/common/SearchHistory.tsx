import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, Heading, Text, IconButton, Flex, Box } from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiRefreshCw } from 'react-icons/fi';
import { WPItem } from '../../lib/classes';
import { extractSearchTermIds, getUniqueTermIdsFromString } from '../../lib/utils';
import { SearchContext } from '../../context/SearchContext';
import useViewer from '../../hooks/queries/useViewer';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';
import useCandidateSearch from '../../hooks/queries/useCandidateSearch';
import ReadableSearchString from './ReadableSearchString';
import { SearchFilterSet } from '../../lib/types';

function assembleStorableSearchParams(searchObj: any, terms: WPItem[]) {
	let departmentId: number = 0;

	// Get the term from `terms` that matches the first `position` in the search object.
	// (There will only ever be one department, so we can bail after the first match.)
	for (let term of terms) {
		if (term.id === Number(searchObj.positions[0])) {
			if (!term.parent) {
				departmentId = term.id;
			} else {
				departmentId = term.parent.id;
			}

			break;
		}
	}

	return {
		...searchObj,
		positions: {
			department: departmentId.toString(),
			jobs: searchObj.positions,
		},
	};
}

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

	const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const { search, userId } = event.currentTarget.dataset;

		if (!search || !userId) return;

		const searchObj = JSON.parse(search);

		const filterSet = assembleStorableSearchParams(searchObj, terms);

		searchDispatch({
			type: 'RESTORE_FILTER_SET',
			payload: {
				filterSet,
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
			<Text>
				<Text as='span' textDecoration='underline'>
					Rerun
				</Text>{' '}
				your last {searches.length > 1 ? `${searches.length} searches` : 'search'}:
			</Text>

			{searches.length > 0 ? (
				<List spacing={2}>
					{searches.map((search: number[], index: number) => {
						return (
							<ListItem key={index}>
								<Flex alignItems='center' justifyContent='flex-start'>
									<IconButton
										icon={<FiRefreshCw />}
										onClick={handleSearchClick}
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

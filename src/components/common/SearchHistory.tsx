import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnorderedList, ListItem, Heading, Text } from '@chakra-ui/react';
import { WPItem } from '../../lib/classes';
import { extractSearchTermIds, getUniqueTermIdsFromString } from '../../lib/utils';
import { SearchContext } from '../../context/SearchContext';
import useViewer from '../../hooks/queries/useViewer';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';
import useCandidateSearch from '../../hooks/queries/useCandidateSearch';
import { isEqual } from 'lodash';

/**
 * Get all the term IDs from the params object.
 *
 * @param string The JSON string.
 * @returns {number[]} The term IDs.
 */
const searchString = (termIds: number[], allTerms: WPItem[]): string => {
	if (!allTerms) return '';

	const terms: WPItem[] = termIds.map(
		(termId) => allTerms.find((term: WPItem) => term.id === termId) as WPItem
	);

	const departments = terms.filter((term) => term.taxonomyName === 'position' && !term.parent);
	const jobs = terms.filter((term) => {
		return term.taxonomyName === 'position' && term.parent;
	});
	const skills = terms.filter((term) => term.taxonomyName === 'skill');
	const others = terms.filter(
		(term) => term.taxonomyName !== 'position' && term.taxonomyName !== 'skill'
	);

	const departmentString = departments.map((department) => department.name).join('/');
	const jobString = jobs.map((position) => position.name).join('/');
	const skillString = skills.map((skill) => skill.name).join(', ');
	const otherString = others.map((other) => other.name).join(', ');

	// Combine the strings with commas, checking if the string is empty first.
	let text = '';
	if (departmentString) text += `Department: ${departmentString}`;
	if (jobString) text += `${text ? ', ' : ''} Job: ${jobString}`;
	if (skillString) text += `${text ? ', ' : ''} Skills: ${skillString}`;
	if (otherString) text += `${text ? ', ' : ''} Filters: ${otherString}`;

	return text;
};

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
				<UnorderedList>
					{searches.map((search: number[], index: number) => {
						const text = searchString(search, terms);
						return (
							<ListItem
								key={index}
								data-search={JSON.stringify(searchHistoryArr[index])}
								data-user-id={loggedInId}
								onClick={handleClick}
							>
								{text}
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

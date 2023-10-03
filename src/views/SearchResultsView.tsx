import { useContext, useMemo } from 'react';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import CandidateList from '../components/CandidateList';

import { SearchContext } from '../context/SearchContext';
import useTaxonomyTerms from '../hooks/queries/useTaxonomyTerms';
import WPItemBadgeList from '../components/common/WPItemBadgeList';

export default function SearchResultsView() {
	const {
		search: {
			filters: {
				filterSet: {
					positions: { departments: departmentIds, jobs: jobIds },
					skills: skillIds,
					unions,
					locations,
					experienceLevels,
					personalIdentities,
					racialIdentities,
					genderIdentities,
				},
			},
			results,
		},
	} = useContext(SearchContext);

	const [departments] = useTaxonomyTerms(
		departmentIds ? departmentIds.map((id) => parseInt(id)) : []
	);
	const [jobs] = useTaxonomyTerms(jobIds ? jobIds.map((id) => parseInt(id)) : []);
	const [skills] = useTaxonomyTerms(skillIds ? skillIds.map((id) => parseInt(id)) : []);

	// Set the results string based on the number of results.
	const resultsCountString = useMemo(() => {
		if (results.length === 0) {
			return 'No results';
		} else if (results.length === 1) {
			return '1 result';
		} else if (results.length > 100) {
			return 'More than 100 results';
		} else {
			return `${results.length} results`;
		}
	}, [results]);

	const additionalFilterCountString = useMemo(() => {
		let count = 0;

		if (unions?.length) count += unions.length;
		if (locations?.length) count += locations.length;
		if (experienceLevels?.length) count += experienceLevels.length;
		if (personalIdentities?.length) count += personalIdentities.length;
		if (racialIdentities?.length) count += racialIdentities.length;
		if (genderIdentities?.length) count += genderIdentities.length;

		if (count === 1) {
			return '+1 additional filter';
		} else if (count > 0) {
			return `+${count} additional filters`;
		}

		return '';
	}, [unions, locations, experienceLevels, personalIdentities, racialIdentities, genderIdentities]);

	const orderedResults: number[] = useMemo(() => {
		if (!results.length) return [];

		// Sort the results by score.
		const sortedResults = [...results].sort((a, b) => {
			return b.score - a.score;
		});

		return sortedResults.map((item) => Number(item.id));
	}, [results]);

	return (
		<Box>
			<Stack direction='row' alignItems='center' mb={2}>
				<Text fontSize='sm'>{resultsCountString}</Text>
				{departmentIds?.length || jobIds?.length || skillIds?.length ? (
					<Flex gap={2} alignItems='center'>
						{departmentIds?.length ? (
							<WPItemBadgeList items={departments} colorScheme='blue' />
						) : (
							false
						)}
						{jobIds?.length ? <WPItemBadgeList items={jobs} colorScheme='green' /> : false}
						{skillIds?.length ? <WPItemBadgeList items={skills} colorScheme='orange' /> : false}
						{additionalFilterCountString ? (
							<Text color='gray.500' fontSize='sm'>
								{additionalFilterCountString}
							</Text>
						) : (
							false
						)}
					</Flex>
				) : (
					false
				)}
			</Stack>
			<CandidateList userIds={orderedResults} inOrder={true} />
		</Box>
	);
}

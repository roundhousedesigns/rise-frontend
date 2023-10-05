import { useContext, useMemo } from 'react';
import { Box, Flex, Icon, Text, Wrap } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import CandidateList from '@components/CandidateList';
import { SearchContext } from '@context/SearchContext';
import useTaxonomyTerms from '@hooks/queries/useTaxonomyTerms';
import WPItemBadgeListItem from '@common/WPItemBadgeListItem';
import TextCenterline from '@common/TextCenterline';

export default function SearchResultsView() {
	const {
		search: {
			searchActive,
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
		departmentIds ? departmentIds.map((id) => Number(id)) : []
	);
	const [jobs] = useTaxonomyTerms(jobIds ? jobIds.map((id) => Number(id)) : []);
	const [skills] = useTaxonomyTerms(skillIds ? skillIds.map((id) => Number(id)) : []);

	/**
	 * Set the results string based on the number of results.
	 */
	const resultsString = () => {
		const len = results.length;

		return len === 0
			? 'No results'
			: len === 1
			? '1 result'
			: len > 100
			? 'First 100 results'
			: `${len} results`;
	};

	/**
	 * Count up any selected additional filter params.
	 */
	const AdditionalFilters = ({ ...props }: { [props: string]: any }) => {
		let count = 0;

		if (unions?.length) count += unions.length;
		if (locations?.length) count += locations.length;
		if (experienceLevels?.length) count += experienceLevels.length;
		if (personalIdentities?.length) count += personalIdentities.length;
		if (racialIdentities?.length) count += racialIdentities.length;
		if (genderIdentities?.length) count += genderIdentities.length;

		return count > 0 ? (
			<Box {...props} fontSize='sm' color='gray.500'>
				{count === 1 ? '+1 additional filter' : `+${count} additional filters`}
			</Box>
		) : (
			<></>
		);
	};

	const orderedResults: number[] = useMemo(() => {
		if (!results.length) return [];

		// Sort the results by score.
		const sortedResults = [...results].sort((a, b) => {
			return b.score - a.score;
		});

		return sortedResults.map((item) => Number(item.id));
	}, [results]);

	const ActiveFilterBadges = () => {
		const badges: {
			name: string;
			colorScheme: string;
		}[] = [];

		departmentIds &&
			departmentIds.length &&
			departments &&
			departments.forEach((department) => {
				badges.push({
					name: department.name,
					colorScheme: 'blue',
				});
			});

		jobIds &&
			jobIds.length &&
			jobs &&
			jobs.forEach((job) => {
				badges.push({
					name: job.name,
					colorScheme: 'green',
				});
			});

		skillIds &&
			skillIds.length &&
			skills &&
			skills.forEach((skill) => {
				badges.push({
					name: skill.name,
					colorScheme: 'orange',
				});
			});

		return badges.length ? (
			<Flex flexWrap='wrap' gap={1} alignItems='center'>
				{badges.map((badge, index) => (
					<WPItemBadgeListItem key={index} colorScheme={badge.colorScheme} fontSize='sm'>
						{badge.name}
					</WPItemBadgeListItem>
				))}
				<AdditionalFilters />
			</Flex>
		) : (
			<></>
		);
	};

	return (
		<Box mt={4}>
			{departmentIds?.length || jobIds?.length || skillIds?.length ? (
				<Flex alignItems='center' mt={4} mb={3}>
					<Icon
						as={FiSearch}
						mr={2}
						borderRadius='full'
						boxSize='10'
						p='3'
						_dark={{ bgColor: 'gray.700', color: 'text.light' }}
						_light={{ bgColor: 'gray.300', color: 'text.dark' }}
					/>
					<ActiveFilterBadges />
				</Flex>
			) : (
				false
			)}
			{searchActive ? (
				<TextCenterline fontSize='xl'>{resultsString()}</TextCenterline>
			) : (
				<Text fontSize='sm'>Your search results will appear here after you Search.</Text>
			)}
			<CandidateList userIds={orderedResults} inOrder={true} />
		</Box>
	);
}

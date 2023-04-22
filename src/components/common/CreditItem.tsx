import { useEffect, useMemo, useState } from 'react';
import { Credit, WPItem } from '../../lib/classes';
import { Card, Heading, Text, Tag, Wrap, TagLabel, Box, Stack, Flex } from '@chakra-ui/react';

import useLazyTaxonomyTerms from '../../hooks/queries/useLazyTaxonomyTerms';
import { decodeString, sortAndCompareArrays } from '../../lib/utils';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';

interface Props {
	id?: string;
	credit: Credit;
	isEditable?: boolean;
	onClick?: () => void;
	[props: string]: any;
}
export default function CreditItem({ credit, isEditable, onClick, ...rest }: Props) {
	const {
		title,
		jobTitle,
		jobLocation,
		positions: { department: departmentIds, jobs: jobIds } = { department: [], jobs: [] },
		skills: skillIds,
		venue,
		// year, // TODO deprecate year
		workStart,
		workEnd,
		workCurrent,
	} = credit || {};

	// Get jobs and skills terms from their IDs
	const [termList, setTermList] = useState<number[]>([]);
	const memoizedTermList = useMemo(() => termList, [termList]);

	// FIXME When departmentIds doesn't exist or is empty, the hook returns the first page of all terms.
	const [department] = useTaxonomyTerms(departmentIds ? departmentIds : []);

	// The term items for each set.
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const [skills, setSkills] = useState<WPItem[]>([]);

	const [getTerms, { data: termData }] = useLazyTaxonomyTerms();

	// Set the term ID list state
	useEffect(() => {
		if (!jobIds && !skillIds) return;

		const termList = jobIds.concat(skillIds);

		setTermList(termList);
	}, [jobIds, skillIds]);

	// Get jobs terms from their IDs
	useEffect(() => {
		if (!sortAndCompareArrays(termList, memoizedTermList) || termList.length === 0) return;

		getTerms({
			variables: {
				include: termList,
			},
		});
	}, [termList, memoizedTermList]);

	// Set jobs and skills state
	useEffect(() => {
		if (!termData) return;

		const {
			terms: { nodes },
		} = termData;

		const jobTerms = jobIds ? nodes.filter((node: WPItem) => jobIds.includes(node.id)) : [];
		const skillTerms = skillIds ? nodes.filter((node: WPItem) => skillIds.includes(node.id)) : [];

		setJobs(jobTerms);
		setSkills(skillTerms);
	}, [termData, jobIds, skillIds]);

	// TODO don't show credit until all is loaded (including depts, credits, and skills)

	const yearString = () => {
		if (workStart && workEnd && !workCurrent) {
			return `${workStart} - ${workEnd}`;
		} else if (workStart && workCurrent) {
			return `${workStart} - Present`;
		} else if (workStart && !workEnd && !workCurrent) {
			return `${workStart}`;
		} else {
			return '';
		}
	};

	return (
		<Box onClick={onClick} {...rest}>
			<Card
				// onClick={handleEditCredit}
				cursor={isEditable ? 'pointer' : 'default'}
				borderWidth={isEditable ? '3px' : '0'}
				borderStyle='dashed'
				borderColor='gray.300'
				_hover={isEditable ? { borderColor: 'gray.500' } : {}}
			>
				<Flex
					alignItems='flex-start'
					justifyContent='space-between'
					flexWrap={{ base: 'wrap', md: 'nowrap' }}
				>
					<Stack direction='column' flex='1 1 50%' minW='420px'>
						<Wrap>
							<Heading fontWeight='bold' fontSize='xl' as='h3'>
								{title}
							</Heading>
							<Text fontSize='lg' fontWeight='bold'>{` ${yearString()}`}</Text>
							<Text fontSize='lg' ml={1} fontWeight='medium'>
								{venue}
								{jobLocation ? decodeString(` &bull; ${jobLocation}`) : ''}
							</Text>
						</Wrap>
						{jobTitle ? (
							<Text fontSize='md' lineHeight='short'>
								{jobTitle}
							</Text>
						) : (
							false
						)}
					</Stack>
					<Box flex='1 1 50%' minW='420px'>
						{departmentIds?.length || jobs?.length || skills?.length ? (
							<Stack direction='column' mt={{ base: 4, md: 0 }}>
								<Wrap spacing={2} justify={{ base: 'left', md: 'right' }}>
									{department?.map((department: WPItem) => (
										<Tag key={department.id} colorScheme='orange'>
											<TagLabel>{decodeString(department.name)}</TagLabel>
										</Tag>
									))}
								</Wrap>
								<Wrap spacing={2} justify={{ base: 'left', md: 'right' }}>
									{jobs?.map((job: WPItem) => (
										<Tag key={job.id} colorScheme='cyan'>
											<TagLabel>{decodeString(job.name)}</TagLabel>
										</Tag>
									))}
								</Wrap>
								<Wrap spacing={2} justify={{ base: 'left', md: 'right' }}>
									{skills?.map((skill: WPItem) => (
										<Tag key={skill.id} colorScheme='teal'>
											<TagLabel>{decodeString(skill.name)}</TagLabel>
										</Tag>
									))}
								</Wrap>
							</Stack>
						) : null}
					</Box>
				</Flex>
			</Card>
		</Box>
	);
}

import { useEffect, useMemo, useState } from 'react';
import { Credit, WPItem } from '../../lib/classes';
import {
	Card,
	Heading,
	Text,
	Tag,
	Wrap,
	TagLabel,
	Box,
	Stack,
	Flex,
	Skeleton,
	Badge,
	useMediaQuery,
} from '@chakra-ui/react';

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

	// Loading state
	const [loading, setLoading] = useState<boolean>(true);

	// FIXME When departmentIds doesn't exist or is empty, the hook returns the first page of all terms.
	const [department] = useTaxonomyTerms(departmentIds ? departmentIds : []);

	// The term items for each set.
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const [skills, setSkills] = useState<WPItem[]>([]);

	const [getTerms, { data: termData }] = useLazyTaxonomyTerms();

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

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

		setLoading(true);

		const {
			terms: { nodes },
		} = termData;

		const jobTerms = jobIds ? nodes.filter((node: WPItem) => jobIds.includes(node.id)) : [];
		const skillTerms = skillIds ? nodes.filter((node: WPItem) => skillIds.includes(node.id)) : [];

		setJobs(jobTerms);
		setSkills(skillTerms);

		setLoading(false);

		return () => setLoading(false);
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
				cursor={isEditable ? 'pointer' : 'default'}
				borderWidth={isEditable ? '3px' : '0'}
				borderStyle='dashed'
				borderColor='gray.300'
				_hover={isEditable ? { borderColor: 'gray.500' } : {}}
			>
				<Skeleton isLoaded={!loading}>
					<Flex
						alignItems='flex-start'
						justifyContent='space-between'
						flexWrap={{ base: 'wrap', md: 'nowrap' }}
					>
						<Stack direction='column' flex='1'>
							<Wrap>
								<Heading fontWeight='bold' fontSize='xl' as='h3'>
									{title}
								</Heading>
								<Badge fontSize='md' fontWeight='bold' textTransform='none'>
									{` ${yearString()}`}
								</Badge>
							</Wrap>
							<Box display={{ base: 'block', md: 'flex' }}>
								<Text fontWeight='medium' display={{ base: 'block', md: 'inline' }}>
									{decodeString(venue)}
								</Text>
								<Text display={{ base: 'block', md: 'inline' }} px={1}>
									{isLargerThanMd ? '✺' : ''}
								</Text>
								<Text display={{ base: 'block', md: 'inline' }}>
									{jobLocation ? decodeString(`${jobLocation}`) : ''}
								</Text>
							</Box>
							{jobTitle ? (
								<Text fontSize='md' lineHeight='short'>
									{jobTitle}
								</Text>
							) : (
								false
							)}
						</Stack>
						<Box flex={{ base: '0 0 100%', md: '0 50%' }}>
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
											<Tag key={job.id} colorScheme='blue'>
												<TagLabel>{decodeString(job.name)}</TagLabel>
											</Tag>
										))}
									</Wrap>
									<Wrap spacing={2} justify={{ base: 'left', md: 'right' }}>
										{skills?.map((skill: WPItem) => (
											<Tag key={skill.id} colorScheme='green'>
												<TagLabel>{decodeString(skill.name)}</TagLabel>
											</Tag>
										))}
									</Wrap>
								</Stack>
							) : null}
						</Box>
					</Flex>
				</Skeleton>
			</Card>
		</Box>
	);
}

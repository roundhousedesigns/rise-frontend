import { useEffect, useMemo, useState, KeyboardEvent } from 'react';
import {
	useMediaQuery,
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
} from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { decodeString, sortAndCompareArrays } from '../lib/utils';
import useLazyTaxonomyTerms from '../hooks/queries/useLazyTaxonomyTerms';
import useTaxonomyTerms from '../hooks/queries/useTaxonomyTerms';
import SpecialChar from './common/chars/SpecialChar';

interface Props {
	id?: string;
	credit: Credit;
	isEditable?: boolean;
	onClick?: () => void;
	[props: string]: any;
}
export default function CreditItem({ credit, isEditable, onClick, ...props }: Props): JSX.Element {
	const {
		title,
		jobTitle,
		jobLocation,
		positions: { department: departmentIds, jobs: jobIds } = { department: [], jobs: [] },
		skills: skillIds,
		venue,
		workStart,
		workEnd,
		workCurrent,
	} = credit || {};

	// Get jobs and skills terms from their IDs
	const [termList, setTermList] = useState<number[]>([]);
	const memoizedTermList = useMemo(() => termList, [termList]);

	const [department] = useTaxonomyTerms(departmentIds ? departmentIds : []);

	// The term items for each set.
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const [skills, setSkills] = useState<WPItem[]>([]);

	const [getTerms, { data: termData, loading: termsLoading }] = useLazyTaxonomyTerms();
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

		const {
			terms: { nodes },
		} = termData;

		const jobTerms = jobIds ? nodes.filter((node: WPItem) => jobIds.includes(node.id)) : [];
		const skillTerms = skillIds ? nodes.filter((node: WPItem) => skillIds.includes(node.id)) : [];

		setJobs(jobTerms);
		setSkills(skillTerms);
	}, [termData, jobIds, skillIds]);

	const handleCreditKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (onClick === undefined) return;

		if (e.key === 'Enter' || e.key === ' ') {
			onClick();
		}
	};

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
		<Box onClick={onClick} {...props}>
			<Card
				cursor={isEditable ? 'pointer' : 'default'}
				tabIndex={0}
				onKeyDown={handleCreditKeyDown}
				borderWidth={isEditable ? '3px' : '0'}
				borderStyle='dashed'
				borderColor='gray.300'
				_hover={isEditable ? { borderColor: 'gray.500' } : {}}
			>
				<Skeleton isLoaded={!termsLoading}>
					<Flex
						alignItems='flex-start'
						justifyContent='space-between'
						flexWrap={{ base: 'wrap', md: 'nowrap' }}
					>
						<Box flex='1'>
							<Flex alignItems='center' gap={2} flexWrap='wrap' mb={2}>
								<Heading as='h3' fontWeight='bold' fontSize='xl' my={0}>
									{title}
								</Heading>
								<Badge
									flex='0 0 auto'
									fontSize='md'
									fontWeight='bold'
									textTransform='none'
									px={2}
									py={1}
								>
									{` ${yearString()}`}
								</Badge>
							</Flex>
							<Flex my={0} alignItems='center' flexWrap='wrap' gap={0}>
								<Text fontWeight='medium' my={0}>
									{decodeString(venue)}
								</Text>
								{isLargerThanMd && (
									<Text my={0} px={1} flex='0 0 auto'>
										<SpecialChar char='starburst' />
									</Text>
								)}
								<Text my={0} flex={{ base: '0 0 100%', md: '1' }}>
									{jobLocation ? decodeString(`${jobLocation}`) : ''}
								</Text>
							</Flex>
							{jobTitle && (
								<Text fontSize='md' lineHeight='short' my={0}>
									{jobTitle}
								</Text>
							)}
						</Box>

						<Box flex={{ base: '0 0 100%', md: '0 50%' }}>
							<Stack direction='column' mt={{ base: 4, md: 0 }}>
								{departmentIds?.length || jobs?.length || skills?.length ? (
									<>
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
									</>
								) : isEditable ? (
									<Wrap justify='right'>
										<Text
											textAlign={{ base: 'left', md: 'right' }}
											maxWidth='250px'
											fontSize='sm'
											lineHeight='short'
										>
											This credit won't be searchable until you add at least one department and a
											job.
										</Text>
									</Wrap>
								) : (
									false
								)}
							</Stack>
						</Box>
					</Flex>
				</Skeleton>
			</Card>
		</Box>
	);
}

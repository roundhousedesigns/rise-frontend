import { useEffect, useMemo, useState, KeyboardEvent } from 'react';
import { Card, Heading, Text, Wrap, Box, Stack, Flex, Skeleton, Badge, BoxProps } from '@chakra-ui/react';
import { Credit, WPItem } from '@lib/classes';
import { decodeString, sortAndCompareArrays } from '@lib/utils';
import useLazyTaxonomyTerms from '@queries/useLazyTaxonomyTerms';
import useTaxonomyTerms from '@queries/useTaxonomyTerms';
import WrapWithIcon from '@common/WrapWithIcon';
import { FiStar, FiMapPin, FiBriefcase } from 'react-icons/fi';
import WPItemBadgeList from '@common/WPItemBadgeList';

interface Props {
	id?: string;
	credit: Credit;
	isEditable?: boolean;
	onClick?: () => void;
}
export default function CreditItem({
	credit,
	isEditable,
	onClick,
	...props
}: Props & BoxProps): JSX.Element {
	const {
		title,
		jobTitle,
		jobLocation,
		positions: { departments: departmentIds, jobs: jobIds } = { departments: [], jobs: [] },
		skills: skillIds,
		venue,
		workStart,
		workEnd,
		workCurrent,
		intern,
		fellow,
	} = credit || {};

	// Get jobs and skills terms from their IDs
	const [termList, setTermList] = useState<number[]>([]);
	const memoizedTermList = useMemo(() => termList, [termList]);

	const [departments] = useTaxonomyTerms(departmentIds ? departmentIds : []);

	// The term items for each set.
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const [skills, setSkills] = useState<WPItem[]>([]);

	const [getTerms, { data: termData, loading: termsLoading }] = useLazyTaxonomyTerms();

	// Set the term ID list state
	useEffect(() => {
		if (!jobIds && !skillIds) return;

		const joinedTermList = jobIds.concat(skillIds);

		setTermList(joinedTermList);
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
		if (workStart && workEnd && workStart === workEnd) {
			return workStart;
		} else if (workStart && workEnd && !workCurrent) {
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
				borderColor={'gray.300'}
				_hover={isEditable ? { borderColor: 'gray.500' } : {}}
			>
				<Skeleton isLoaded={!termsLoading}>
					<Flex
						alignItems={'flex-start'}
						justifyContent={'space-between'}
						flexWrap={{ base: 'wrap', md: 'nowrap' }}
					>
						<Box flex='1'>
							<Flex alignItems='center' gap={2} flexWrap='wrap' mb={2}>
								<Heading as='h3' fontWeight='bold' fontSize='xl' my={0}>
									{title}
								</Heading>
								<Badge
									flex={'0 0 auto'}
									fontSize='md'
									fontWeight='bold'
									textTransform='none'
									px={2}
									py={1}
								>
									{` ${yearString()}`}
								</Badge>
							</Flex>
							<Flex my={0} alignItems='center' flexWrap='wrap' gap={2}>
								{venue ? (
									<WrapWithIcon icon={FiStar} mr={1}>
										{decodeString(venue)}
									</WrapWithIcon>
								) : (
									false
								)}
								{jobLocation ? (
									<WrapWithIcon icon={FiMapPin} mr={1}>
										{decodeString(`${jobLocation}`)}
									</WrapWithIcon>
								) : (
									false
								)}
								<Flex my={0} alignItems='center' flexWrap='wrap' gap={2}>
									{jobTitle && <WrapWithIcon icon={FiBriefcase}>{jobTitle}</WrapWithIcon>}
									{intern || fellow ? (
										<Flex color={'brand.yellow'} gap={1} ml={2}>
											{intern ? (
												<Text
													flex={'0 0 auto'}
													fontSize='sm'
													fontWeight='bold'
													textTransform='none'
													py={1}
												>
													Internship
												</Text>
											) : (
												''
											)}

											{intern && fellow ? (
												<Text fontSize='2xl' mx={0} my={1}>
													&middot;
												</Text>
											) : (
												''
											)}

											{fellow ? (
												<Text
													flex={'0 0 auto'}
													fontSize='sm'
													fontWeight='bold'
													textTransform='none'
													py={1}
													colorScheme='yellow'
												>
													Fellowship
												</Text>
											) : (
												''
											)}
										</Flex>
									) : (
										false
									)}
								</Flex>
							</Flex>
						</Box>

						<Box flex={{ base: '0 0 100%', md: '0 50%' }}>
							<Stack direction='column' mt={{ base: 4, md: 0 }}>
								{departmentIds?.length || jobs?.length || skills?.length ? (
									<Stack direction='column'>
										<WPItemBadgeList items={departments} colorScheme='orange' />
										<WPItemBadgeList items={jobs} colorScheme='blue' />
										<WPItemBadgeList items={skills} colorScheme='green' />
									</Stack>
								) : isEditable ? (
									<Wrap justify='right'>
										<Text
											textAlign={{ base: 'left', md: 'right' }}
											maxWidth='250px'
											fontSize='sm'
											lineHeight='short'
										>
											This credit won't be active and searchable until you add at least one
											department and a job.
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

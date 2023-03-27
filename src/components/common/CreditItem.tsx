import { useEffect, useMemo, useState } from 'react';
import { Credit, WPItem } from '../../lib/classes';
import { Card, Heading, Text, Tag, Wrap, TagLabel, Box } from '@chakra-ui/react';

import useTaxonomyTerm from '../../hooks/queries/useTaxonomyTerm';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';
import { decodeString, sortAndCompareArrays } from '../../lib/utils';

interface Props {
	id?: string;
	credit: Credit;
	isEditable?: boolean;
	onClick?: () => void;
	// moveItemUp?: (index: number) => void;
	// moveItemDown?: (index: number) => void;
}
// TODO is id used at all properly??
export default function CreditItem({ credit, isEditable, onClick }: Props) {
	const {
		title,
		jobTitle,
		jobLocation,
		positions: { department: departmentId, jobs: jobIds } = { department: 0, jobs: [] },
		skills: skillIds,
		venue,
		year,
	} = credit || {};

	// Get jobs and skills terms from their IDs
	const [termList, setTermList] = useState<number[]>([]);
	const memoizedTermList = useMemo(() => termList, [termList]);

	const [department] = useTaxonomyTerm(departmentId ? departmentId : 0);

	// The term items for each set.
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const [skills, setSkills] = useState<WPItem[]>([]);

	const [getTerms, { data: termData }] = useTaxonomyTerms();

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

	return (
		<Box onClick={onClick}>
			<Card
				// onClick={handleEditCredit}
				cursor={isEditable ? 'pointer' : 'default'}
				borderWidth={isEditable ? '3px' : '0'}
				borderStyle='dashed'
				borderColor='gray.400'
				_hover={isEditable ? { borderColor: 'black' } : {}}
			>
				<Wrap>
					<Heading fontWeight='bold' fontSize='xl' as='h3'>
						{title}
						{year ? ` (${year})` : ''}
					</Heading>
					<Text fontSize='lg' ml={1} fontWeight='medium'>
						{venue}
						{jobLocation ? decodeString(` &bull; ${jobLocation}`) : ''}
					</Text>
				</Wrap>
				{jobTitle ? (
					<Text fontSize='md' my={0} pb={2} lineHeight={0.2}>
						{decodeString(jobTitle)}
					</Text>
				) : (
					false
				)}
				{department || jobs?.length || skills?.length ? (
					<Wrap spacing={2}>
						{department ? (
							<Tag colorScheme='orange'>
								<TagLabel>{decodeString(department.name)}</TagLabel>
							</Tag>
						) : null}
						{jobs?.map((job: WPItem) => (
							<Tag key={job.id} colorScheme='cyan'>
								<TagLabel>{decodeString(job.name)}</TagLabel>
							</Tag>
						))}
						{skills?.map((skill: WPItem) => (
							<Tag key={skill.id} colorScheme='teal'>
								<TagLabel>{decodeString(skill.name)}</TagLabel>
							</Tag>
						))}
					</Wrap>
				) : null}
			</Card>
		</Box>
	);
}

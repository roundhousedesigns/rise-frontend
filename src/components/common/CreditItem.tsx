import { useEffect, useMemo, useState } from 'react';
import { Credit, WPItem } from '../../lib/classes';
import {
	Card,
	Heading,
	Text,
	Tag,
	Wrap,
	TagLabel,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	useDisclosure,
} from '@chakra-ui/react';

// FIXME edit credit bug, react hooks order error

import useTaxonomyTerm from '../../hooks/queries/useTaxonomyTerm';
import EditCreditView from '../EditCreditView';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';
import { sortAndCompareArrays } from '../../lib/utils';

interface Props {
	credit: Credit;
	editable?: boolean;
}

export default function CreditItem({ credit, editable }: Props) {
	const {
		title,
		positions: { department: departmentId, jobs: jobIds } = { department: 0, jobs: [] },
		skills: skillIds,
		venue,
		year,
	} = credit || {};

	// Get jobs and skills terms from their IDs
	const [termList, setTermList] = useState<number[]>([]);
	const memoizedTermList = useMemo(() => termList, [termList]);

	const [department] = useTaxonomyTerm(departmentId);

	// The term items for each set.
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const [skills, setSkills] = useState<WPItem[]>([]);

	const [getTerms, { data: termData }] = useTaxonomyTerms();

	// Set the term ID list state
	useEffect(() => {
		if (!jobIds && !skillIds) return;

		const termList = [...jobIds, ...skillIds];

		setTermList(termList);
	}, []);

	// Get jobs terms from their IDs
	useEffect(() => {
		if (!sortAndCompareArrays(termList, memoizedTermList) || termList.length === 0) return;

		getTerms({
			variables: {
				include: termList,
			},
		});

		setTermList(termList);
	}, [termList]);

	// Set jobs and skills state
	useEffect(() => {
		if (!termData) return;

		const {
			terms: { nodes },
		} = termData;

		const jobTerms = nodes.filter((node: WPItem) => jobIds.includes(node.id));
		const skillTerms = nodes.filter((node: WPItem) => skillIds.includes(node.id));

		setJobs(jobTerms);
		setSkills(skillTerms);
	}, [termData]);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleEditCredit = () => {
		if (!editable) return;
		onOpen();
	};

	const handleCloseEditCredit = () => {
		onClose();
	};

	return (
		<>
			<Card
				onClick={handleEditCredit}
				cursor={editable ? 'pointer' : 'default'}
				borderWidth='3px'
				borderStyle='dashed'
				borderColor='gray.400'
				_hover={editable ? { borderColor: 'black' } : {}}
			>
				<Wrap>
					<Heading fontWeight='bold' fontSize='xl' as='h3'>
						{title}
						{year ? ` (${year})` : ''}
					</Heading>
					<Text fontSize='lg' ml={1} fontWeight='medium' fontStyle='italic'>
						{venue}
					</Text>
				</Wrap>
				{department || jobs?.length || skills?.length ? (
					<Wrap spacing={2}>
						{department ? (
							<Tag fontWeight='medium' colorScheme='orange'>
								<TagLabel>{department.name}</TagLabel>
							</Tag>
						) : null}
						{jobs?.map((job: WPItem) => (
							<Tag key={job.id} fontWeight='medium' colorScheme='cyan'>
								<TagLabel>{job.name}</TagLabel>
							</Tag>
						))}
						{skills?.map((skill: WPItem) => (
							<Tag key={skill.id} colorScheme='teal'>
								<TagLabel>{skill.name}</TagLabel>
							</Tag>
						))}
					</Wrap>
				) : null}
			</Card>
			<Modal isOpen={isOpen} onClose={handleCloseEditCredit} scrollBehavior='outside' size='4xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Heading size='lg'>Edit Credit</Heading>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<EditCreditView credit={credit} onClose={onClose} />
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

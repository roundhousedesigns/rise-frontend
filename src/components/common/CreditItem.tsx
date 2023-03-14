import { useState } from 'react';
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

import useTaxonomyTerm from '../../hooks/queries/useTaxonomyTerm';
import EditCreditView from '../EditCreditView';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';

interface Props {
	credit: Credit;
	editable?: boolean;
}

export default function CreditItem({ credit, editable }: Props) {
	const {
		title,
		positions: { department: departmentId, jobs: jobIds, skills: skillIds },
		venue,
		year,
	} = credit;
	const [department] = useTaxonomyTerm(departmentId);
	const [jobs] = useTaxonomyTerms(jobIds);
	const [skills] = useTaxonomyTerms(skillIds);
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
			<Card onClick={handleEditCredit} cursor={editable ? 'pointer' : 'default'}>
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
								<TagLabel>{department?.name}</TagLabel>
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
					<ModalHeader>Edit Credit</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<EditCreditView credit={credit} />
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

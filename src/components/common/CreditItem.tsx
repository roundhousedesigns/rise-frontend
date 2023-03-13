import { useState } from 'react';
import { Credit } from '../../lib/classes';
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

interface Props {
	credit: Credit;
	editable?: boolean;
}

export default function CreditItem({ credit, editable }: Props) {
	const { title, positions, venue, year, skills } = credit;
	const [department] = useTaxonomyTerm(positions[0]?.id);
	const [editCredit, setEditCredit] = useState<boolean>(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleEditCredit = () => {
		if (!editable) return;
		onOpen();
		setEditCredit(true);
	};

	const handleCloseEditCredit = () => {
		onClose();
		setEditCredit(false);
	};

	return (
		<>
			<Card onClick={handleEditCredit}>
				<Wrap>
					<Heading fontWeight='bold' fontSize='xl' as='h3'>
						{title}
						{year ? ` (${year})` : ''}
					</Heading>
					<Text fontSize='lg' ml={1} fontWeight='medium' fontStyle='italic'>
						{venue}
					</Text>
				</Wrap>
				{positions && positions.length > 0 ? (
					<Wrap spacing={2}>
						<Tag fontWeight='medium' colorScheme='orange' size='md'>
							<TagLabel>{department?.name}</TagLabel>
						</Tag>
						{positions.map((position) => (
							<Tag key={position.id} fontWeight='medium' colorScheme='cyan' size='md'>
								<TagLabel>{position.name}</TagLabel>
							</Tag>
						))}
						{skills && skills.length > 0
							? skills.map((skill) => (
									<Tag key={skill.id} colorScheme='teal' size='sm'>
										<TagLabel>{skill.name}</TagLabel>
									</Tag>
							  ))
							: null}
					</Wrap>
				) : null}
			</Card>
			<Modal
				isOpen={isOpen}
				onClose={handleCloseEditCredit}
				scrollBehavior='outside'
				size='4xl'
			>
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

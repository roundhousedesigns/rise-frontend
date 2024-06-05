import { useContext, useMemo, useState } from 'react';
import {
	chakra,
	List,
	ListItem,
	Flex,
	Spacer,
	IconButton,
	Button,
	Text,
	Heading,
	Divider,
	Link,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiDelete, FiPlus } from 'react-icons/fi';
import { ConflictRange } from '@lib/classes';
import { EditProfileContext } from '@context/EditProfileContext';
import useViewer from '@hooks/queries/useViewer';
import useDeleteOwnConflictRange from '@hooks/mutations/useDeleteOwnConflictRange';
import EditUnavailDateRangeModal from '@/components/EditConflictDateRangeModal';

export default function EditConflictDateRanges() {
	const { loggedInId } = useViewer();
	const {
		editProfile: { conflictRanges },
	} = useContext(EditProfileContext);

	const MotionBox = motion(chakra.div);

	const { deleteOwnConflictRangeMutation } = useDeleteOwnConflictRange();

	const sortedConflictRanges: ConflictRange[] = useMemo(() => {
		return conflictRanges
			.slice()
			.sort((a, b) =>
				a.startDate && b.startDate ? a.startDate.getTime() - b.startDate.getTime() : 0
			);
	}, [conflictRanges]);

	const [conflictRangeModalIsOpen, setConflictRangeModalIsOpen] = useState<boolean>(false);
	const [conflictRange, setConflictRange] = useState<ConflictRange>(new ConflictRange());

	const handleEditConflictRange = (conflictRange?: ConflictRange) => {
		setConflictRangeModalIsOpen(true);
		setConflictRange(conflictRange || new ConflictRange());
	};

	const handleCloseEditConflictRangeModal = () => {
		setConflictRangeModalIsOpen(false);
	};

	const handleDeleteDateRange = ({ id }: ConflictRange) => {
		if (!id) return;

		deleteOwnConflictRangeMutation(id, loggedInId);
	};

	return (
		<>
			<Heading variant='contentTitle'>Conflicts</Heading>
			<Text fontSize='sm' my={0}>
				Add your conflict dates here. These will appear on your profile, but will not affect your
				appearance in search results.
			</Text>
			<Divider />
			<Spacer />
			<List flexDirection='column' spacing={0}>
				{sortedConflictRanges && sortedConflictRanges.length ? (
					<AnimatePresence>
						{sortedConflictRanges.map((conflictRange, index) => (
							<MotionBox
								key={index}
								initial={{ opacity: 1 }} // Initial opacity of 1 (fully visible)
								animate={{ opacity: 1 }} // Animate to opacity of 1 (fully visible)
								exit={{ opacity: 0 }} // Animate to opacity of 0 (completely transparent)
							>
								<ListItem>
									<Flex alignItems='center' justifyContent='flex-start' gap={2}>
										<Link
											href='#'
											variant='dotted'
											lineHeight='normal'
											px={0}
											flex='0 0 auto'
											bg='none'
											height='auto'
											borderRadius='none'
											onClick={() => handleEditConflictRange(conflictRange)}
										>
											{conflictRange.toString('long')}
										</Link>
										<Spacer />
										<IconButton
											onClick={() => handleDeleteDateRange(conflictRange)}
											icon={<FiDelete />}
											size='sm'
											flex='0'
											aria-label='Remove date range'
											colorScheme='red'
										/>
									</Flex>
								</ListItem>
							</MotionBox>
						))}
					</AnimatePresence>
				) : (
					false
				)}
				<Button onClick={() => handleEditConflictRange()} leftIcon={<FiPlus />} size='sm' mt={2}>
					Add Dates
				</Button>
				<EditUnavailDateRangeModal
					conflictRange={conflictRange}
					allConflictRanges={sortedConflictRanges}
					isOpen={conflictRangeModalIsOpen}
					onClose={handleCloseEditConflictRangeModal}
				/>
			</List>
		</>
	);
}

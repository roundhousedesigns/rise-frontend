import { useContext, useEffect, useMemo, useState } from 'react';
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
	useToast,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiDelete, FiPlus } from 'react-icons/fi';
import { DateRange } from '@lib/classes';
import { EditProfileContext } from '@context/EditProfileContext';
import useViewer from '@hooks/queries/useViewer';
import useDeleteOwnConflictRange from '@hooks/mutations/useDeleteOwnConflictRange';
import EditConflictDateRangeModal from '@components/EditConflictDateRangeModal';

export default function EditConflictDateRanges() {
	const { loggedInId } = useViewer();
	const {
		editProfile: { conflictRanges },
	} = useContext(EditProfileContext);

	const MotionBox = motion(chakra.div);

	const {
		deleteOwnConflictRangeMutation,
		results: { data: deleteData, loading: deleteLoading },
	} = useDeleteOwnConflictRange();

	const sortedDateRanges: DateRange[] = useMemo(() => {
		return conflictRanges
			.slice()
			.sort((a, b) =>
				a.startDate && b.startDate ? a.startDate.getTime() - b.startDate.getTime() : 0
			);
	}, [conflictRanges]);

	const [conflictRangeModalIsOpen, setConflictRangeModalIsOpen] = useState<boolean>(false);
	const [conflictRange, setDateRange] = useState<DateRange>(new DateRange());

	const toast = useToast();

	// Show a toast if the conflict range was successfully deleted.
	useEffect(() => {
		if (deleteData?.deleeOwnConflictRange?.result === true && !deleteLoading) {
			toast({
				title: 'Success!',
				description: 'Dates deleted.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
	}, [deleteData, deleteLoading]);

	const handleEditDateRange = (conflictRange?: DateRange) => {
		setConflictRangeModalIsOpen(true);
		setDateRange(conflictRange || new DateRange());
	};

	const handleCloseEditDateRangeModal = () => {
		setConflictRangeModalIsOpen(false);
	};

	const handleDeleteDateRange = ({ id }: DateRange) => {
		if (!id) return;

		deleteOwnConflictRangeMutation(id, loggedInId);
	};

	return (
		<>
			<Heading variant='contentTitle'>Scheduling Conflicts</Heading>
			<Text fontSize='sm' my={0}>
				Add your conflict dates here. These will appear on your profile, but will not affect your
				appearance in search results.
			</Text>
			<Divider />
			<Spacer />
			<List flexDirection='column' spacing={0}>
				{sortedDateRanges && sortedDateRanges.length ? (
					<AnimatePresence>
						{sortedDateRanges.map((conflictRange, index) => (
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
											flex='auto'
											maxW='full'
											bg='none'
											height='auto'
											w='100%'
											borderRadius='none'
											onClick={() => handleEditDateRange(conflictRange)}
										>
											{conflictRange.toString('long')}
										</Link>
										<Spacer />
										<IconButton
											onClick={() => handleDeleteDateRange(conflictRange)}
											icon={<FiDelete />}
											size='sm'
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
				<Button onClick={() => handleEditDateRange()} leftIcon={<FiPlus />} size='sm' mt={2}>
					Add Dates
				</Button>
				<EditConflictDateRangeModal
					conflictRange={conflictRange}
					allDateRanges={sortedDateRanges}
					isOpen={conflictRangeModalIsOpen}
					onClose={handleCloseEditDateRangeModal}
				/>
			</List>
		</>
	);
}

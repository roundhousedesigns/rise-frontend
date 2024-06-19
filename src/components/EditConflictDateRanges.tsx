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
import { DateRange } from '@lib/classes';
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

	const sortedDateRanges: DateRange[] = useMemo(() => {
		return conflictRanges
			.slice()
			.sort((a, b) =>
				a.startDate && b.startDate ? a.startDate.getTime() - b.startDate.getTime() : 0
			);
	}, [conflictRanges]);

	const [conflictRangeModalIsOpen, setDateRangeModalIsOpen] = useState<boolean>(false);
	const [conflictRange, setDateRange] = useState<DateRange>(new DateRange());

	const handleEditDateRange = (conflictRange?: DateRange) => {
		setDateRangeModalIsOpen(true);
		setDateRange(conflictRange || new DateRange());
	};

	const handleCloseEditDateRangeModal = () => {
		setDateRangeModalIsOpen(false);
	};

	const handleDeleteDateRange = ({ id }: DateRange) => {
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
											flex='0 0 auto'
											bg='none'
											height='auto'
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
				<Button onClick={() => handleEditDateRange()} leftIcon={<FiPlus />} size='sm' mt={2}>
					Add Dates
				</Button>
				<EditUnavailDateRangeModal
					conflictRange={conflictRange}
					allDateRanges={sortedDateRanges}
					isOpen={conflictRangeModalIsOpen}
					onClose={handleCloseEditDateRangeModal}
				/>
			</List>
		</>
	);
}
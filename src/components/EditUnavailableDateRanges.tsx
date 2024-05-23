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
import { UnavailRange } from '@lib/classes';
import { EditProfileContext } from '@context/EditProfileContext';
import useViewer from '@hooks/queries/useViewer';
import useDeleteOwnUnavailRange from '@hooks/mutations/useDeleteOwnUnavailRange';
import EditUnavailDateRangeModal from '@components/EditUnavailDateRangeModal';

export default function EditUnavailableDateRanges() {
	const { loggedInId } = useViewer();
	const {
		editProfile: { unavailRanges },
	} = useContext(EditProfileContext);

	const MotionBox = motion(chakra.div);

	const { deleteOwnUnavailRangeMutation } = useDeleteOwnUnavailRange();

	const sortedUnavailRanges: UnavailRange[] = useMemo(() => {
		return unavailRanges
			.slice()
			.sort((a, b) =>
				a.startDate && b.startDate ? a.startDate.getTime() - b.startDate.getTime() : 0
			);
	}, [unavailRanges]);

	const [unavailRangeModalIsOpen, setUnavailRangeModalIsOpen] = useState<boolean>(false);
	const [unavailRange, setUnavailRange] = useState<UnavailRange>(new UnavailRange());

	const handleEditUnavailRange = (unavailRange?: UnavailRange) => {
		setUnavailRangeModalIsOpen(true);
		setUnavailRange(unavailRange || new UnavailRange());
	};

	const handleCloseEditUnavailRangeModal = () => {
		setUnavailRangeModalIsOpen(false);
	};

	const handleDeleteDateRange = ({ id }: UnavailRange) => {
		if (!id) return;

		deleteOwnUnavailRangeMutation(id, loggedInId);
	};

	return (
		<>
			<Heading variant='contentTitle'>Booked or Busy</Heading>
			<Text fontSize='sm' my={0}>
				If you're unavaible for work during certain dates, you can add them here. They'll be
				displayed on your profile, but won't affect searches.
			</Text>
			<Divider />
			<Spacer />
			<List flexDirection='column' gap={2}>
				{sortedUnavailRanges && sortedUnavailRanges.length ? (
					<AnimatePresence>
						{sortedUnavailRanges.map((unavailRange, index) => (
							<MotionBox
								key={index}
								initial={{ opacity: 1 }} // Initial opacity of 1 (fully visible)
								animate={{ opacity: 1 }} // Animate to opacity of 1 (fully visible)
								exit={{ opacity: 0 }} // Animate to opacity of 0 (completely transparent)
							>
								<ListItem>
									<Flex alignItems='center' justifyContent='space-between' gap={2}>
										<Link
											as={Button}
											variant='dotted'
											lineHeight='normal'
											px={0}
											flex='auto'
											bg='none'
											height='auto'
											borderRadius='none'
											onClick={() => handleEditUnavailRange(unavailRange)}
										>
											{unavailRange.toString()}
										</Link>
										<Spacer />
										<IconButton
											onClick={() => handleDeleteDateRange(unavailRange)}
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
				<Button onClick={() => handleEditUnavailRange()} leftIcon={<FiPlus />} size='sm'>
					Add Dates
				</Button>
				<EditUnavailDateRangeModal
					unavailRange={unavailRange}
					isOpen={unavailRangeModalIsOpen}
					onClose={handleCloseEditUnavailRangeModal}
				/>
			</List>
		</>
	);
}

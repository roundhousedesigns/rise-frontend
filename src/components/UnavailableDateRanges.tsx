import { useContext, useMemo, useState } from 'react';
import {
	chakra,
	List,
	ListItem,
	Flex,
	Spacer,
	ButtonGroup,
	IconButton,
	Button,
	Text,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiEdit, FiDelete, FiPlus } from 'react-icons/fi';
import { UnavailRange } from '@lib/classes';
import { EditProfileContext } from '@context/EditProfileContext';
import useViewer from '@hooks/queries/useViewer';
import useDeleteOwnUnavailRange from '@hooks/mutations/useDeleteOwnUnavailRange';
import EditUnavailDateRangeModal from '@components/EditUnavailDateRangeModal';

export default function UnavailableDateRanges() {
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
									<Text>{unavailRange.toString()}</Text>
									<Spacer />
									<ButtonGroup
										alignItems='center'
										justifyContent='space-between'
										flex='0 0 auto'
										size='sm'
										spacing={1}
									>
										<IconButton
											onClick={() => handleEditUnavailRange(unavailRange)}
											icon={<FiEdit />}
											size='sm'
											aria-label='Edit date range'
											colorScheme='blue'
										/>
										<IconButton
											onClick={() => handleDeleteDateRange(unavailRange)}
											icon={<FiDelete />}
											size='sm'
											aria-label='Remove date range'
											colorScheme='red'
										/>
									</ButtonGroup>
								</Flex>
							</ListItem>
						</MotionBox>
					))}
				</AnimatePresence>
			) : (
				false
			)}
			{/* TODO: Make this a handler */}
			<Button onClick={() => handleEditUnavailRange()} leftIcon={<FiPlus />} size='sm'>
				Add New Dates
			</Button>
			<EditUnavailDateRangeModal
				unavailRange={unavailRange}
				isOpen={unavailRangeModalIsOpen}
				onClose={handleCloseEditUnavailRangeModal}
			/>
		</List>
	);
}

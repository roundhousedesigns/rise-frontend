import React, { useState } from 'react';
import { DateRangePicker as ReactDateRangePicker, RangeKeyDict } from 'react-date-range';
import { addDays } from 'date-fns';
import {
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	useDisclosure,
} from '@chakra-ui/react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateRange {
	startDate: Date;
	endDate: Date;
	key: string;
}

const DateRangePicker: React.FC = () => {
	const [state, setState] = useState<DateRange[]>([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: 'selection',
		},
	]);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSelect = (ranges: RangeKeyDict) => {
		const newRange = ranges['selection'] as DateRange;
		setState([newRange]);
	};

	return (
		<Box>
			<Button onClick={onOpen} colorScheme='teal'>
				Select Date Range
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent w='auto' maxW='none'>
					<ModalHeader>Select Date Range</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<ReactDateRangePicker
							onChange={handleSelect}
							moveRangeOnFirstSelection={false}
							months={2}
							ranges={state}
							direction='vertical'
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default DateRangePicker;

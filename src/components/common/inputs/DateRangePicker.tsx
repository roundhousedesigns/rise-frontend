import { useState } from 'react';
import { Box, Button, Flex, Spacer, Stack, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { UnavailRange } from '@/lib/classes';

interface Props {
	startDate?: Date;
	endDate?: Date;
	saveCallback?: (startDate: Date, endDate: Date) => void;
}

export default function DateRangePicker({ startDate, endDate, saveCallback }: Props) {
	const [newStartDate, setNewStartDate] = useState<Date | undefined>(startDate || undefined);
	const [newEndDate, setNewEndDate] = useState<Date | undefined>(endDate || undefined);

	/**
	 * Updates the start and end dates based on the provided dates array.
	 *
	 * @param {[Date, Date]} dates - The array containing the start and end dates.
	 * @return {void} No return value.
	 */
	const onChange = (dates: [Date, Date]) => {
		const [start, end] = dates;
		setNewStartDate(start);
		setNewEndDate(end);
	};

	/**
	 * Checks if both start date and end date are defined, then calls the saveCallback function with a new UnavailRange object.
	 *
	 * @return {void}
	 */
	const handleSave = () => {
		if (!newStartDate || !newEndDate || saveCallback === undefined) {
			return;
		}

		saveCallback(newStartDate, newEndDate);
	};

	/**
	 * Creates a date range string based on the new start and end dates.
	 *
	 * @return {string} The formatted date range string.
	 */
	const dateRangeString = () => {
		const newRange = new UnavailRange({ startDate: newStartDate, endDate: newEndDate });
		return newRange.toString('long');
	};

	return (
		<Flex gap={2}>
			<DatePicker
				onChange={onChange}
				selected={newStartDate}
				startDate={newStartDate}
				endDate={newEndDate}
				selectsRange
				inline
			/>
			<Stack direction='column'>
				{newStartDate && newEndDate ? (
					<>
						<Spacer />
						<Box>
							<Text fontSize='sm'>Selected:</Text>
							<Text fontSize='lg'>{dateRangeString()}</Text>
						</Box>
						<Spacer />
					</>
				) : (
					false
				)}
				{saveCallback ? (
					<>
						<Spacer />
						<Button
							onClick={handleSave}
							colorScheme='blue'
							isDisabled={!newStartDate || !newEndDate}
						>
							Save
						</Button>
					</>
				) : (
					false
				)}
			</Stack>
		</Flex>
	);
}

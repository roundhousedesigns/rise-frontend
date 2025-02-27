import { useState } from 'react';
import { Box, Button, Flex, Spacer, Stack, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { DateRange } from '@lib/classes';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
	startDate?: Date;
	endDate?: Date;
	saveCallback: (startDate: Date, endDate: Date) => void;
	handleSelect?: () => void;
	error?: string;
}

export default function DateRangePicker({
	startDate,
	endDate,
	saveCallback,
	handleSelect,
	error,
}: Props) {
	const [newStartDate, setNewStartDate] = useState<Date | undefined>(startDate || undefined);
	const [newEndDate, setNewEndDate] = useState<Date | undefined>(endDate || undefined);

	/**
	 * Updates the start and end dates based on the provided dates array.
	 *
	 * @param {[Date, Date]} dates - The array containing the start and end dates.
	 * @return {void} No return value.
	 */
	const onChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setNewStartDate(start || undefined);
		setNewEndDate(end || undefined);
	};

	/**
	 * Checks if both start date and end date are defined, then calls the saveCallback function with a new DateRange object.
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
		const newRange = new DateRange({ startDate: newStartDate, endDate: newEndDate });
		return newRange.toString('long');
	};

	return (
		<Flex gap={2}>
			<DatePicker
				onChange={onChange}
				onSelect={handleSelect ? handleSelect : undefined}
				selected={newStartDate}
				startDate={newStartDate}
				endDate={newEndDate}
				minDate={new Date()}
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
							{error ? (
								<Text variant='notice' fontSize='sm'>
									{error}
								</Text>
							) : (
								false
							)}
						</Box>
						<Spacer />
					</>
				) : (
					false
				)}
				<>
					<Spacer />
					<Button onClick={handleSave} colorScheme='blue' isDisabled={!newStartDate || !newEndDate}>
						Save
					</Button>
				</>
			</Stack>
		</Flex>
	);
}

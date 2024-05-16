import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
	startDate: Date;
	endDate: Date;
	callback: (startDate: Date, endDate: Date) => void;
}

export default function DateRangePicker({ startDate, endDate, callback }: Props) {
	const [newStartDate, setNewStartDate] = useState<Date>(startDate);
	const [newEndDate, setNewEndDate] = useState<Date>(endDate);

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
	 * Checks if both start date and end date are defined, then calls the callback function with a new UnavailRange object.
	 *
	 * @return {void}
	 */
	const handleSave = () => {
		if (!newStartDate || !newEndDate) {
			return;
		}

		callback(newStartDate, newEndDate);
	};

	return (
		<>
			<DatePicker
				onChange={onChange}
				selected={newStartDate}
				startDate={newStartDate}
				endDate={newEndDate}
				selectsRange
				inline
			/>
			<Button onClick={handleSave}>Save</Button>
		</>
	);
}

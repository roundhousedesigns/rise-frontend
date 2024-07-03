import { useContext, useEffect, useState } from 'react';
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiXCircle } from 'react-icons/fi';
import { DateRange } from '@lib/classes';
import { SearchContext } from '@context/SearchContext';
import DatePickerButton from '@common/inputs/DatePickerButton';

export default function SearchFilterDates() {
	const {
		search: {
			filters: {
				filterSet: { jobDates },
			},
		},
		searchDispatch,
	} = useContext(SearchContext);
	const [selectedDates, setSelectedDates] = useState<DateRange>(
		jobDates ? jobDates : new DateRange()
	);

	// If startDate is after endDate (and endDate is set), clear endDate.
	useEffect(() => {
		if (
			selectedDates.startDate &&
			selectedDates.endDate &&
			selectedDates.startDate > selectedDates.endDate
		) {
			setSelectedDates((prevDates) => new DateRange({ ...prevDates, endDate: undefined }));
		}
	}, [selectedDates.startDate]);

	const handleDateChange = (targetId: string) => (date: Date) => {
		setSelectedDates((prevDates) => new DateRange({ ...prevDates, [targetId]: date }));

		searchDispatch({
			type: 'SET_JOB_DATES',
			payload: { jobDates: new DateRange({ ...selectedDates, [targetId]: date }) },
		});
	};

	const handleClearDates = () => {
		setSelectedDates(new DateRange());
		searchDispatch({ type: 'SET_JOB_DATES', payload: { jobDates: new DateRange() } });
	};

	// TODO destructure selectedDates before using here
	return (
		<Box id='filterDates' mt={8}>
			<Heading as='h3' variant='searchFilterTitle'>
				Are you hiring for a particular date?
			</Heading>
			<Flex gap={4}>
				<DatePicker
					closeOnScroll={(e) => e.target === document}
					selected={selectedDates.startDate}
					customInput={<DatePickerButton defaultText='Start' ariaLabel='Start date' />}
					onChange={handleDateChange('startDate')}
					minDate={new Date()}
				/>
				{selectedDates.startDate && <Text fontSize='md'> to </Text>}
				{selectedDates.startDate && (
					<DatePicker
						closeOnScroll={(e) => e.target === document}
						selected={selectedDates.endDate}
						customInput={
							<DatePickerButton defaultText='End (optional)' ariaLabel='End date (optional)' />
						}
						onChange={handleDateChange('endDate')}
						minDate={selectedDates.startDate}
					/>
				)}
				{selectedDates.startDate && (
					<IconButton
						icon={<FiXCircle />}
						aria-label='Clear dates'
						onClick={handleClearDates}
						colorScheme='red'
					/>
				)}
			</Flex>
			<Text variant='helperText'>
				Candidates with potential scheduling conflicts will be highlighted.
			</Text>
		</Box>
	);
}

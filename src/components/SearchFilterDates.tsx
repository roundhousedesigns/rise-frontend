import { useContext } from 'react';
import { Box, Button, Flex, Heading, IconButton, Spacer, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiXCircle } from 'react-icons/fi';
import DatePickerButton from '@common/inputs/DatePickerButton';
import { SearchContext } from '@/context/SearchContext';
import { DateRange } from '@/lib/classes';
import { useState } from 'react';

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

	const handleDateChange = (targetId: string) => (date: Date) => {
		setSelectedDates((prevDates) => ({ ...prevDates, [targetId]: date }));
		searchDispatch({
			type: 'SET_JOB_DATES',
			payload: { jobDates: { ...selectedDates, [targetId]: date } },
		});
	};

	const handleClearDates = () => {
		setSelectedDates(new DateRange());
		searchDispatch({ type: 'SET_JOB_DATES', payload: { jobDates: new DateRange() } });
	};

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
		</Box>
	);
}

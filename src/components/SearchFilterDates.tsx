import { useContext, useEffect } from 'react';
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiXCircle } from 'react-icons/fi';
import { DateRange } from '@lib/classes';
import DatePickerButton from '@common/inputs/DatePickerButton';
import { SearchContext } from '@context/SearchContext';

export default function SearchFilterDates() {
	const {
		search: {
			filters: {
				filterSet: { jobDates },
			},
		},
		searchDispatch,
	} = useContext(SearchContext);

	const { startDate, endDate } = jobDates || new DateRange();

	useEffect(() => {
		// If startDate is after endDate (and endDate is set), clear endDate.
		if (startDate && endDate && startDate > endDate) {
			searchDispatch({
				type: 'SET_FILTER',
				payload: {
					filter: { key: 'jobDates', value: new DateRange({ startDate, endDate: undefined }) },
				},
			});
		}
	}, [startDate]);

	/**
	 * Updates the selected dates by setting the value of a specific date field to the provided date.
	 * Also updates the job dates by dispatching an action with the updated date range.
	 */
	const handleDateChange =
		(targetId: string) =>
		(date: Date): void => {
			searchDispatch({
				type: 'SET_FILTER',
				payload: {
					filter: {
						key: 'jobDates',
						value: new DateRange({ ...jobDates, [targetId]: date }),
					},
				},
			});
		};

	/**
	 * Clears the selected dates and updates the job dates with an empty DateRange.
	 */
	const handleClearDates = (): void => {
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
					selected={startDate}
					customInput={<DatePickerButton defaultText='Start' ariaLabel='Start date' />}
					onChange={handleDateChange('startDate')}
					minDate={new Date()}
				/>
				{startDate && <Text fontSize='md'> to </Text>}
				{startDate && (
					<DatePicker
						closeOnScroll={(e) => e.target === document}
						selected={endDate}
						customInput={
							<DatePickerButton defaultText='End (optional)' ariaLabel='End date (optional)' />
						}
						onChange={handleDateChange('endDate')}
						minDate={startDate}
					/>
				)}
				{startDate && (
					<IconButton
						icon={<FiXCircle />}
						aria-label='Clear dates'
						onClick={handleClearDates}
						colorScheme='red'
					/>
				)}
			</Flex>
			<Text variant='helperText'>
				Candidates who have potential scheduling conflicts will be highlighted with a{' '}
				<IconButton
					icon={<FiCalendar />}
					variant='sampleIconButton'
					aria-label='Scheduling conflict icon'
					bgColor='red.300'
					color='text.dark'
					size='xs'
				/>
				.
			</Text>
		</Box>
	);
}

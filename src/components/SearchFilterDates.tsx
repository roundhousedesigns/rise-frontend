import { useContext, useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiXCircle } from 'react-icons/fi';
import { DateRange } from '@lib/classes';
import DatePickerButton from '@common/inputs/DatePickerButton';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import { SearchContext } from '@context/SearchContext';
import InlineIconText from '@components/InlineIconText';
import { useField, useFormikContext } from 'formik';

export default function SearchFilterDates() {
	const { setFieldValue } = useFormikContext();
	const [field] = useField('jobDates');
	const { searchDispatch } = useContext(SearchContext);

	const { startDate, endDate } = field.value || new DateRange();

	useEffect(() => {
		// If startDate is after endDate (and endDate is set), clear endDate.
		if (startDate && endDate && startDate > endDate) {
			const newDateRange = new DateRange({ startDate, endDate: undefined });
			setFieldValue('jobDates', newDateRange);
			searchDispatch({
				type: 'SET_FILTER',
				payload: {
					filter: { key: 'jobDates', value: newDateRange },
				},
			});
		}
	}, [startDate, endDate, setFieldValue, searchDispatch]);

	/**
	 * Updates the selected dates by setting the value of a specific date field to the provided date.
	 * Also updates the job dates by dispatching an action with the updated date range.
	 */
	const handleDateChange =
		(targetId: string) =>
		(date: Date): void => {
			const newDateRange = new DateRange({ ...field.value, [targetId]: date });
			setFieldValue('jobDates', newDateRange);
			searchDispatch({
				type: 'SET_FILTER',
				payload: {
					filter: {
						key: 'jobDates',
						value: newDateRange,
					},
				},
			});
		};

	/**
	 * Clears the selected dates and updates the job dates with an empty DateRange.
	 */
	const handleClearDates = (): void => {
		const emptyDateRange = new DateRange();
		setFieldValue('jobDates', emptyDateRange);
		searchDispatch({
			type: 'SET_FILTER',
			payload: { filter: { key: 'jobDates', value: emptyDateRange } },
		});
	};

	return (
		<>
			<Flex gap={4} alignItems={'center'} flexWrap={'wrap'}>
				<DatePicker
					closeOnScroll={(e) => e.target === document}
					selected={startDate}
					customInput={<DatePickerButton defaultText={'Start'} ariaLabel={'Start date'} />}
					onChange={handleDateChange('startDate')}
					minDate={new Date()}
				/>
				{startDate && <Text fontSize={'md'}> to </Text>}
				{startDate && (
					<DatePicker
						closeOnScroll={(e) => e.target === document}
						selected={endDate}
						customInput={
							<DatePickerButton defaultText={'End (optional)'} ariaLabel={'End date (optional)'} />
						}
						onChange={handleDateChange('endDate')}
						minDate={startDate}
					/>
				)}
				{startDate && (
					<TooltipIconButton
						icon={<FiXCircle />}
						label={'Clear dates'}
						onClick={handleClearDates}
						colorScheme={'red'}
					/>
				)}
			</Flex>

			<InlineIconText
				icon={<FiCalendar />}
				text={'Candidates with potential scheduling conflicts will be highlighted with a badge.'}
				query={'badge'}
				description={'scheduling conflict'}
				fontSize={'sm'}
				iconProps={{ size: 'xs', bgColor: 'red.300', color: 'text.dark' }}
			/>
		</>
	);
}

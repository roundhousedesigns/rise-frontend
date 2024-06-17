import { useState } from 'react';
import { Flex, Button, Box, Heading, Text, Wrap, Spacer, IconButton } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiXCircle } from 'react-icons/fi';
import DatePickerButton from '@common/inputs/DatePickerButton';

export default function SearchFilterDates() {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const handleSetDate = (id: string) => (date: Date, event: React.SyntheticEvent<any, Event>) => {
		switch (id) {
			case 'startDate':
				setStartDate(date);
				break;

			case 'endDate':
				setEndDate(date);
				break;
		}
	};

	const handleClearDates = () => {
		setStartDate(undefined);
		setEndDate(undefined);
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
					onChange={(date: Date) => setStartDate(date)}
					minDate={new Date()}
				/>
				{startDate ? <Text fontSize='md'> to </Text> : false}
				{startDate ? (
					<DatePicker
						closeOnScroll={(e) => e.target === document}
						selected={endDate}
						customInput={
							<DatePickerButton defaultText='End (optional)' ariaLabel='End date (optional)' />
						}
						onChange={handleSetDate('endDate')}
						minDate={startDate}
					/>
				) : (
					false
				)}
				{startDate !== undefined ? (
					<IconButton
						icon={<FiXCircle />}
						aria-label='Clear dates'
						onClick={handleClearDates}
						colorScheme='red'
					/>
				) : (
					false
				)}
			</Flex>
		</Box>
	);
}

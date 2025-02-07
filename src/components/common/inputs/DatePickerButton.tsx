import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';

interface DatePickerButtonProps {
	defaultText: string;
	ariaLabel?: string;
	value?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const DatePickerButton = forwardRef<HTMLButtonElement, DatePickerButtonProps>(
	({ defaultText, ariaLabel, value, onClick, ...props }, ref): JSX.Element => (
		<Button
			onClick={onClick}
			leftIcon={<FiCalendar />}
			ref={ref}
			variant='searchFilter'
			aria-label={ariaLabel ? ariaLabel : defaultText}
			{...props}
		>
			{value ? value : defaultText}
		</Button>
	)
);

export default DatePickerButton;

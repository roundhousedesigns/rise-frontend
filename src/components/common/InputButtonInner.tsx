import { Box } from '@chakra-ui/react';

interface Props {
	checkboxOrRadioProps: any; // TODO Type this
	children: React.ReactNode;
}

export default function InputButtonInner({ checkboxOrRadioProps, children }: Props) {
	return (
		<Box
			{...checkboxOrRadioProps}
			cursor='pointer'
			borderRadius='md'
			bg='gray.100'
			borderWidth={1}
			borderColor='gray.300'
			transitionDuration='normal'
			_hover={{
				bg: 'blue.50',
			}}
			_checked={{
				bg: 'blue.600',
				color: 'white',
			}}
			_focus={{
				outline: '1px',
			}}
			_dark={{
				bg: 'gray.900',
				_hover: {
					bg: 'blue.700',
				},
				_checked: {
					bg: 'blue.500',
				},
			}}
			px={4}
		>
			{children}
		</Box>
	);
}

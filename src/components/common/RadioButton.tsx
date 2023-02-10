import { Box, useRadio } from '@chakra-ui/react';

// 1. Create a component that consumes the `useRadio` hook

interface Props {
	[key: string]: any;
}

export function RadioButton(props: Props): React.ReactElement {
	const { getInputProps, getCheckboxProps } = useRadio(props);
	const { children } = props;

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				borderWidth='1px'
				borderRadius='md'
				boxShadow='md'
				_checked={{
					bg: 'teal.600',
					color: 'white',
					borderColor: 'teal.600',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				px={5}
				py={3}
			>
				{children}
			</Box>
		</Box>
	);
}

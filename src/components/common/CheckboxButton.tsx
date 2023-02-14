import { Box, useCheckbox } from '@chakra-ui/react';

interface Props {
	[key: string]: any;
}

export function CheckboxButton(props: Props): React.ReactElement {
	const { getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useCheckbox(props);
	const { children } = props;

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as='label'>
			<input {...input} hidden />
			{/* TODO Dark mode */}
			{/* TODO Accessibility using a div as a checkbox? */}
			<Box
				{...checkbox}
				{...htmlProps}
				// TODO Make these display props sharable between components
				cursor='pointer'
				borderRadius='sm'
				bg='gray.100'
				_hover={{
					bg: 'blue.100',
				}}
				_checked={{
					bg: 'blue.300',
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
				px={5}
				py={2}
			>
				<Box {...getLabelProps}>{children}</Box>
			</Box>
		</Box>
	);
}

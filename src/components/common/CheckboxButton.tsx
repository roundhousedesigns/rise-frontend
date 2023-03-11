import { Box, Text, useCheckbox } from '@chakra-ui/react';

interface Props {
	[key: string]: any;
}

export default function CheckboxButton(props: Props): React.ReactElement {
	const { getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useCheckbox(props);
	const { children } = props;

	return (
		<Box as='label'>
			<input {...getInputProps()} hidden />
			{/* TODO Check accessibility using a div as a checkbox? */}
			<Box
				{...getCheckboxProps()}
				{...htmlProps}
				// TODO Make these display props sharable between components
				cursor='pointer'
				borderRadius='sm'
				bg='blue.50'
				borderWidth={1}
				borderColor='gray.300'
				transitionDuration='normal'
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
				px={3}
				py={2}
			>
				<Text p={0} m={0} {...getLabelProps}>
					{children}
				</Text>
			</Box>
		</Box>
	);
}

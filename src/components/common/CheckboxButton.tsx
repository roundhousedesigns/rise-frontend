import { Box, chakra, Text, useCheckbox } from '@chakra-ui/react';

interface Props {
	[key: string]: any;
}

export default function CheckboxButton(props: Props): React.ReactElement {
	const { getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useCheckbox(props);
	const { children } = props;

	return (
		<chakra.label {...htmlProps}>
			<input {...getInputProps()} hidden />
			{/* TODO Make sure this is accessible */}
			{/* TODO Fix color scheme for light and dark modes */}
			<Box
				{...getCheckboxProps()}
				cursor='pointer'
				borderRadius='sm'
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
				px={3}
				py={2}
				m={0}
			>
				<Text {...getLabelProps} color='inherit'>
					{children}
				</Text>
			</Box>
		</chakra.label>
	);
}

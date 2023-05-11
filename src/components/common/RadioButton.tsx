import { chakra, Box, useRadio } from '@chakra-ui/react';

interface Props {
	[key: string]: any;
}

export default function RadioButton(props: Props): React.ReactElement {
	const { getInputProps, getRadioProps, htmlProps, getLabelProps } = useRadio(props);
	const { children } = props;

	return (
		<chakra.label {...htmlProps}>
			{/* TODO Make sure this is accessible */}
			{/* TODO Fix color scheme for light and dark modes */}
			<input {...getInputProps()} hidden />
			<Box
				{...getRadioProps()}
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
					color: 'text.light',
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
				py={2}
				px={4}
				{...getLabelProps}
			>
				{children}
			</Box>
		</chakra.label>
	);
}

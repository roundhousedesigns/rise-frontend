import { chakra, Box, useRadio } from '@chakra-ui/react';

interface Props {
	[key: string]: any;
}

export default function RadioButton(props: Props): React.ReactElement {
	const { getInputProps, getCheckboxProps, htmlProps } = useRadio(props);
	const { children } = props;

	return (
		<chakra.label {...htmlProps}>
			<input {...getInputProps()} hidden />
			<Box
				{...getCheckboxProps()}
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
				{children}
			</Box>
		</chakra.label>
	);
}

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
			{/* // TODO Dark mode */}
			<Box
				{...checkbox}
				{...htmlProps}
				cursor='pointer'
				borderWidth='1px'
				borderColor='gray.800'
				borderRadius='sm'
				bg='gray.50'
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
				px={5}
				py={3}
			>
				<Box {...getLabelProps}>{children}</Box>
			</Box>
		</Box>
	);
}

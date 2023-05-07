import { chakra, Text, useCheckbox } from '@chakra-ui/react';
import InputButtonInner from './InputButtonInner';

interface Props {
	[key: string]: any;
}

export default function CheckboxButton(props: Props): React.ReactElement {
	const { getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useCheckbox(props);
	const { children, ...rest } = props;

	return (
		<chakra.label {...htmlProps}>
			{/* TODO Make sure this is accessible */}
			{/* TODO Fix color schemes */}

			<input {...getInputProps()} hidden />

			<InputButtonInner checkboxOrRadioProps={getCheckboxProps()}>
				<Text color='inherit' {...getLabelProps} {...rest}>
					{children}
				</Text>
			</InputButtonInner>
		</chakra.label>
	);
}

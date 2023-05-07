import { chakra, Text, useRadio } from '@chakra-ui/react';
import InputButtonInner from './InputButtonInner';

interface Props {
	[key: string]: any;
}

export default function RadioButton(props: Props): React.ReactElement {
	const { getInputProps, getRadioProps, htmlProps, getLabelProps } = useRadio(props);
	const { children, ...rest } = props;

	return (
		<chakra.label {...htmlProps}>
			{/* TODO Make sure this is accessible */}
			{/* TODO Fix color schemes */}

			<input {...getInputProps()} hidden />

			<InputButtonInner checkboxOrRadioProps={getRadioProps()}>
				<Text color='inherit' {...getLabelProps} {...rest}>
					{children}
				</Text>
			</InputButtonInner>
		</chakra.label>
	);
}

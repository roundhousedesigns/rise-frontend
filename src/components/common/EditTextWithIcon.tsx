import { Flex, FormControl, Icon } from '@chakra-ui/react';
import EditableTextInput from './inputs/EditableTextInput';

interface Props {
	value: string | undefined | null;
	name: string;
	icon: any;
	label: string;
	placeholder?: string;
	labelVisuallyHidden?: boolean;
	handleChange: (name: string) => (value: string) => void;
	outerProps?: {
		[key: string]: any;
	};
}

export default function EditTextWithIcon({
	value,
	name,
	icon,
	label,
	placeholder,
	labelVisuallyHidden = false,
	handleChange,
	outerProps,
	...inputProps
}: Props): JSX.Element {
	return (
		<Flex alignItems='center' {...outerProps}>
			<Icon as={icon} mr={2} />
			<FormControl>
				<EditableTextInput
					defaultValue={value ? value : ''}
					label={label}
					labelVisuallyHidden={labelVisuallyHidden}
					name={name}
					placeholder={placeholder ? placeholder : ''}
					handleChange={handleChange}
					{...inputProps}
				/>
			</FormControl>
		</Flex>
	);
}

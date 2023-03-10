import { Flex, FormControl, Icon, VisuallyHidden } from '@chakra-ui/react';
import EditableTextInput from './inputs/EditableTextInput';

interface Props {
	value: string | undefined | null;
	name: string;
	label: string;
	icon: any;
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
					handleChange={handleChange}
					{...inputProps}
				/>
			</FormControl>
		</Flex>
	);
}

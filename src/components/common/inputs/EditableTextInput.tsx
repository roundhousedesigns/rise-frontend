import {
	BoxProps,
	Editable,
	EditableInput,
	EditablePreview,
	FormControl,
	FormLabel,
	VisuallyHidden,
	// Tooltip,
} from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';

interface Props extends BoxProps {
	defaultValue: string;
	label: string;
	labelVisuallyHidden?: boolean;
	styles?: any;
}

export default function EditableTextInput({
	defaultValue,
	label,
	labelVisuallyHidden,
	styles,
	...rest
}: Props): JSX.Element {
	return (
		<FormControl>
			<Editable defaultValue={defaultValue} {...styles} {...rest}>
				<EditablePreview display='block' />
				<EditableInput display='block' />
			</Editable>
			<FormLabel ml={2}>
				{labelVisuallyHidden ? <VisuallyHidden>{label}</VisuallyHidden> : label}
			</FormLabel>
		</FormControl>
	);
}

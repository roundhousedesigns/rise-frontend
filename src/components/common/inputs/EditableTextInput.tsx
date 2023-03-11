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

interface Props extends BoxProps {
	defaultValue: string;
	name: string;
	label: string;
	labelVisuallyHidden?: boolean;
	handleChange: (name: string) => (value: string) => void;
	outerProps?: {
		[key: string]: any;
	};
	styles?: any;
}

export default function EditableTextInput({
	defaultValue,
	name,
	label,
	labelVisuallyHidden,
	styles,
	handleChange,
	outerProps,
	...inputProps
}: Props): JSX.Element {

	return (
		<FormControl {...outerProps}>
			<Editable
				defaultValue={defaultValue}
				onChange={handleChange(name)}
				{...styles}
				{...inputProps}
			>
				<EditablePreview display='block' />
				<EditableInput display='block' />
			</Editable>
			<FormLabel ml={2}>
				{labelVisuallyHidden ? <VisuallyHidden>{label}</VisuallyHidden> : label}
			</FormLabel>
		</FormControl>
	);
}

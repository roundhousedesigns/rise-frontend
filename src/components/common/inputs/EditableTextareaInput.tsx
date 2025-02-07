import { useEffect, useRef } from 'react';
import {
	BoxProps,
	Editable,
	EditableTextarea,
	EditablePreview,
	FormControl,
	FormLabel,
	VisuallyHidden,
	// Tooltip,
} from '@chakra-ui/react';
import autosize from 'autosize';

interface Props extends BoxProps {
	defaultValue: string;
	name: string;
	label: string;
	labelVisuallyHidden?: boolean;
	outerProps?: BoxProps;
	handleChange: (name: string) => (value: string) => void;
	styles?: any;
}

export default function EditableTextareaInput({
	defaultValue,
	name,
	label,
	labelVisuallyHidden,
	handleChange,
	styles,
	outerProps,
	...inputProps
}: Props): JSX.Element {
	const ref = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		autosize(ref.current);
		return () => {
			ref.current && autosize.destroy(ref.current);
		};
	}, []);

	return (
		<FormControl {...outerProps}>
			<FormLabel ml={2}>
				{labelVisuallyHidden ? <VisuallyHidden>{label}</VisuallyHidden> : label}
			</FormLabel>
			<Editable
				defaultValue={defaultValue}
				onChange={handleChange(name)}
				{...styles}
				{...inputProps}
			>
				<EditablePreview minHeight={28} w='full' whiteSpace={'pre-wrap'} />
				<EditableTextarea minHeight={28} rows={20} ref={ref} p={2} />
			</Editable>
		</FormControl>
	);
}

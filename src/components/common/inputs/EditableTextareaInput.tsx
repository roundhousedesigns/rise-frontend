import { useEffect, useRef } from 'react';
import {
	BoxProps,
	Editable,
	EditableTextarea,
	EditablePreview,
	// Tooltip,
} from '@chakra-ui/react';
import autosize from 'autosize';

interface Props extends BoxProps {
	defaultValue: string;
	styles?: any;
}

export default function EditableTextareaInput({
	defaultValue,
	styles,
	...rest
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
		// TODO Bio textarea placeholder text
		<Editable defaultValue={defaultValue} {...styles} {...rest}>
			<EditablePreview minHeight={20} w='full' />
			<EditableTextarea rows={4} ref={ref} p={2} />
		</Editable>
	);
}

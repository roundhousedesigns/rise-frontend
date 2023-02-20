import { useEffect, useRef } from 'react';
import {
	BoxProps,
	Editable,
	EditableTextarea,
	EditablePreview,
	useEditableControls,
	IconButton,
	ButtonGroup,
	// Tooltip,
} from '@chakra-ui/react';
import autosize from 'autosize';
import { FiCheck, FiX, FiEdit } from 'react-icons/fi';

interface Props extends BoxProps {
	defaultValue: string;
	styles?: any;
}

/**
 * The editable field component.
 *
 * @returns {JSX.Element} The editable field.
 */
function EditableControls(): JSX.Element | null {
	const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
		useEditableControls();

	return isEditing ? (
		<>
			<ButtonGroup size='sm' mt={2}>
				<IconButton
					aria-label='Save'
					colorScheme='cyan'
					icon={<FiCheck />}
					{...getSubmitButtonProps()}
				/>
				<IconButton
					aria-label='Cancel'
					colorScheme='orange'
					icon={<FiX />}
					{...getCancelButtonProps()}
				/>
			</ButtonGroup>
		</>
	) : null;
}

export default function EditableTextareaInput({ defaultValue, styles, ...rest }: Props): JSX.Element {
	const ref = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		autosize(ref.current);
		return () => {
			ref.current && autosize.destroy(ref.current);
		};
	}, []);

	return (
		<Editable defaultValue={defaultValue} {...styles} {...rest}>
			<EditablePreview />
			<EditableTextarea rows={6} ref={ref} />
			<EditableControls />
		</Editable>
	);
}

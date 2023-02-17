import {
	BoxProps,
	Editable,
	EditableInput,
	EditableTextarea,
	EditablePreview,
	useEditableControls,
	IconButton,
	ButtonGroup,
	Tooltip,
} from '@chakra-ui/react';
import { FiCheck, FiX, FiEdit } from 'react-icons/fi';

interface Props extends BoxProps {
	defaultValue: string;
	editable: boolean;
	styles?: any;
	textarea?: boolean;
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

export default function TextInput({
	defaultValue,
	editable,
	styles,
	textarea = false,
	...rest
}: Props): JSX.Element {
	return (
		<Editable defaultValue={defaultValue} isDisabled={!editable} {...styles} {...rest}>
			<EditablePreview />
			{textarea ? <EditableTextarea rows={10} /> : <EditableInput />}
			<EditableControls />
		</Editable>
	);
}

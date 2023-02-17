import {
	EditablePreview,
	Box,
	useColorModeValue,
	IconButton,
	Input,
	useDisclosure,
	useEditableControls,
	ButtonGroup,
	SlideFade,
	Editable,
	Tooltip,
	EditableInput,
} from '@chakra-ui/react';
import { FiCheckCircle, FiX } from 'react-icons/fi';

interface Props {
	defaultValue: string;
	isDisabled: boolean;
	as: any;
	sx?: {
		[key: string]: any;
	};
}

export default function EditableField({ defaultValue, isDisabled, as, sx }: Props) {
	/* Here's a custom control */
	function EditableControls() {
		const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
			useEditableControls();

		return isEditing ? (
			<ButtonGroup justifyContent='end' size='sm' w='full' spacing={2} mt={2}>
				<IconButton aria-label='Save' icon={<FiCheckCircle />} {...getSubmitButtonProps()} />
				<IconButton aria-label='Cancel' icon={<FiX />} {...getCancelButtonProps()} />
			</ButtonGroup>
		) : null;
	}

	return (
		<Editable defaultValue={defaultValue} isPreviewFocusable={true} selectAllOnFocus={false}>
			<Tooltip label='Click to edit'>
				<EditablePreview
					py={2}
					px={4}
					_hover={{
						background: useColorModeValue('gray.100', 'gray.700'),
					}}
				/>
			</Tooltip>
			<Input py={2} px={4} />
			<EditableControls />
		</Editable>
	);
}

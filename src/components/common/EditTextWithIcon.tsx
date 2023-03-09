import { Flex, Icon } from '@chakra-ui/react';
import EditableTextInput from './inputs/EditableTextInput';

interface Props {
	value: string | undefined | null;
	icon?: any;
	label: string;
	labelVisuallyHidden?: boolean;
}

export default function EditTextWithIcon({
	value,
	icon,
	label,
	labelVisuallyHidden = false,
}: Props): JSX.Element {
	return (
		<Flex alignItems='center'>
			{icon ? <Icon as={icon} mr={2} /> : null}
			<EditableTextInput
				defaultValue={value ? value : ''}
				label={label}
				labelVisuallyHidden={labelVisuallyHidden}
			/>
		</Flex>
	);
}

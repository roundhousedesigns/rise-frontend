import { ButtonGroup } from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';
import ResponsiveButton from '@common/inputs/ResponsiveButton';

interface Props {
	isLoading?: boolean;
	handleCancel: () => void;
}

export default function EditCreditButtons({ isLoading, handleCancel }: Props) {
	return (
		<ButtonGroup size='md'>
			<ResponsiveButton
				type='submit'
				isLoading={isLoading}
				icon={<FiCheck />}
				label='Save'
				colorScheme='green'
			>
				Save
			</ResponsiveButton>
			<ResponsiveButton
				icon={<FiX />}
				label='Cancel changes'
				colorScheme='red'
				onClick={handleCancel}
				isDisabled={isLoading}
			>
				Cancel
			</ResponsiveButton>
		</ButtonGroup>
	);
}

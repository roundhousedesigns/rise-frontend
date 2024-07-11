import { ButtonGroup } from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

interface Props {
	isLoading?: boolean;
	handleSubmit: () => void;
	handleCancel: () => void;
}

export default function EditCreditButtons({ isLoading, handleSubmit, handleCancel }: Props) {
	return (
		<ButtonGroup size='md'>
			<TooltipIconButton
				type='submit'
				isLoading={isLoading}
				onClick={handleSubmit}
				icon={<FiCheck />}
				label='Save'
				colorScheme='green'
			/>
			<TooltipIconButton
				icon={<FiX />}
				label='Cancel changes'
				colorScheme='red'
				onClick={handleCancel}
				isDisabled={isLoading}
			/>
		</ButtonGroup>
	);
}

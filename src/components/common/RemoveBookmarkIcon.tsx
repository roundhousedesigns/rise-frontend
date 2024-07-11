import { IconButton, useColorMode, useDisclosure, useToken } from '@chakra-ui/react';
import { FiMinusCircle } from 'react-icons/fi';
import ConfirmActionDialog from '@common/ConfirmActionDialog';

interface Props {
	id: number;
	handleRemoveBookmark: (id: number) => void;
}

export default function RemoveBookmarkIcon({ id, handleRemoveBookmark }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
	const [red, light, dark] = useToken('colors', ['brand.red', 'gray.50', 'gray.900']);

	const iconLabel = 'Remove this candidate from your saved candidates';

	const handleRemove = () => {
		handleRemoveBookmark(id);
		onClose();
	};

	return (
		<>
			<IconButton
				icon={
					<FiMinusCircle
						color={red}
						fill={red}
						stroke={colorMode === 'dark' ? dark : light}
						strokeWidth={2}
						size={30}
					/>
				}
				variant={'bookmark'}
				aria-label={iconLabel}
				title={iconLabel}
				onClick={onOpen}
				mr={2}
			/>
			<ConfirmActionDialog
				isOpen={isOpen}
				onClose={onClose}
				confirmAction={handleRemove}
				headerText='Remove Bookmark?'
				buttonsText={{ confirm: 'Yes', cancel: 'No' }}
			>
				Are you sure you want to remove this candidate from your bookmarks?
			</ConfirmActionDialog>
		</>
	);
}

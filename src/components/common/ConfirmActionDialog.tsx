import { ReactNode, useRef } from 'react';
import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
} from '@chakra-ui/react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	confirmAction: () => void;
	headerText: string;
	buttonsText?: {
		confirm?: string;
		cancel?: string;
	};
	confirmButtonColorScheme?: string;
	children: ReactNode;
}

export default function ConfirmActionDialog({
	isOpen,
	onClose,
	confirmAction,
	headerText,
	buttonsText,
	confirmButtonColorScheme,
	children,
}: Props) {
	const cancelRef = useRef<HTMLButtonElement>(null);

	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						{headerText}
					</AlertDialogHeader>

					<AlertDialogBody>{children}</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							{buttonsText?.cancel ? buttonsText.cancel : 'Cancel'}
						</Button>
						<Button
							colorScheme={confirmButtonColorScheme ? confirmButtonColorScheme : 'green'}
							onClick={confirmAction}
							ml={3}
						>
							{buttonsText?.confirm ? buttonsText.confirm : 'OK'}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}

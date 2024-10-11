import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	chakra,
	Button,
	Flex,
	Box,
	Text,
	Link,
	Divider,
	useToast,
	ButtonGroup,
} from '@chakra-ui/react';
import useViewer from '@queries/useViewer';
import useDeleteOwnAccount from '@mutations/useDeleteOwnAccount';
import useLogout from '@mutations/useLogout';

export default function DeleteAccountView({ onClose }: { onClose: () => void }) {
	const [{ loggedInId }] = useViewer();

	const { logoutMutation } = useLogout();
	const { deleteOwnAccountMutation, result: deleteOwnAccountResult } = useDeleteOwnAccount();

	const handleDeleteOwnAccount = () => {
		deleteOwnAccountMutation(loggedInId);
	};

	useEffect(() => {
		if (deleteOwnAccountResult.data) {
			onClose();

			toast({
				title: 'Account deleted',
				description:
					'Your account and data have been permanently deleted. You can re-register at any time.',
				status: 'success',
				duration: 2000,
			});

			setTimeout(() => {
				logoutMutation().then(() => {
					window.location.href = '/';
				});
			}, 3000);
		}
	}, [deleteOwnAccountResult.data]);

	const toast = useToast();

	return (
		<>
			<Text fontSize={'md'} lineHeight={'normal'}>
				To completely delete your account, click the 'Delete my account' button. Otherwise, click
				cancel. Your account and all data will be permanently deleted. You can re-register at any
				time.
			</Text>
			<ButtonGroup mt={4}>
				<Button colorScheme={'red'} onClick={handleDeleteOwnAccount}>
					Delete my account
				</Button>
				<Button colorScheme={'gray'} onClick={onClose}>
					Cancel
				</Button>
			</ButtonGroup>
		</>
	);
}

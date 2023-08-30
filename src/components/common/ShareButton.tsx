import { useEffect } from 'react';
import { IconButton, useClipboard, useToast } from '@chakra-ui/react';
import { FiShare2 } from 'react-icons/fi';

interface Props {
	url: string;
	[prop: string]: any;
}

export default function ShareButton({ url, ...props }: Props) {
	const { onCopy, setValue, hasCopied } = useClipboard('');
	const toast = useToast();

	const handleShareClick = () => {
		if (navigator.share) {
			navigator
				.share({
					title: 'Share this profile',
					text: 'Check out this profile on the RISE Theatre Directory.',
					url: url,
				})
				.catch((error) => {
					console.error('Error sharing', error);
				});
		} else {
			setValue(url);
			onCopy();
		}
	};

	// Set the copy value to the profile URL
	useEffect(() => {
		setValue(url);
	}, [url]);

	// Pop up the toast when the user copies the URL
	useEffect(() => {
		if (hasCopied) {
			toast({
				title: 'Copied!',
				position: 'top',
				description: 'The profile link has been copied to your clipboard.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
	}, [hasCopied]);

	return (
		<IconButton
			aria-label='Share profile'
			title='Share profile'
			icon={<FiShare2 />}
			onClick={handleShareClick}
			{...props}
		/>
	);
}

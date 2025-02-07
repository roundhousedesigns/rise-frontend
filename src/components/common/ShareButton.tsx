import { useEffect } from 'react';
import { useClipboard, useToast, ButtonProps } from '@chakra-ui/react';
import { FiShare2 } from 'react-icons/fi';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

interface Props {
	url: string;
}

export default function ShareButton({ url, ...props }: Props & ButtonProps) {
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
					console.error(error);
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
				position: 'bottom',
				description: 'The profile link has been copied to your clipboard.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
	}, [hasCopied]);

	return (
		<TooltipIconButton label='Share' icon={<FiShare2 />} onClick={handleShareClick} {...props} />
	);
}

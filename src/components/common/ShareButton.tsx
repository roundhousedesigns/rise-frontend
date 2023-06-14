import { FiShare } from 'react-icons/fi';
import ResponsiveButton from './inputs/ResponsiveButton';

interface Props {
	url: string;
	[prop: string]: any;
}

export default function ShareButton({ url, ...props }: Props) {
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
			console.log('Web Share API not supported on this browser.');
		}
	};

	return (
		<ResponsiveButton
			label='Share profile'
			icon={<FiShare />}
			colorScheme='blue'
			onClick={handleShareClick}
			{...props}
		>
			Share
		</ResponsiveButton>
	);
}

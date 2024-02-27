import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Card,
	CloseButton,
	Flex,
	Icon,
	Link,
	Spacer,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
	profileDisabled: boolean;
	numberCredits: number;
	[prop: string]: any;
}

export default function ProfileNotices({
	profileDisabled,
	numberCredits,
	...props
}: Props): JSX.Element | false {
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });

	const primary = profileDisabled
		? 'Your profile is currently hidden.'
		: numberCredits < 1
		? "You haven't added any professional credits."
		: '';

	const secondary = (
		<>
			{profileDisabled ? (
				<>
					You may still search, but to appear in the directory, turn on your profile's visibility
					in{' '}
					<Link as={RouterLink} to='/settings'>
						Settings
					</Link>
				</>
			) : numberCredits < 1 ? (
				<>
					<Link as={RouterLink} to='/profile/edit'>
						Edit your profile
					</Link>{' '}
					and add some to allow people to look find you in the Directory!
				</>
			) : (
				''
			)}
		</>
	);

	return isVisible && (profileDisabled || numberCredits < 1) ? (
		<Alert
			status='warning'
			colorScheme='yellow'
			variant='solid'
			justifyContent='space-between'
			fontSize='lg'
			{...props}
		>
			<AlertIcon />
			<AlertTitle>{primary}</AlertTitle>
			<AlertDescription>{secondary}</AlertDescription>
			<Spacer />
			<CloseButton onClick={onClose} />
		</Alert>
	) : (
		false
	);
}

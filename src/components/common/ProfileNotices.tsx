import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	Link,
	Spacer,
} from '@chakra-ui/react';
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
	if (!profileDisabled && numberCredits >= 1) {
		return false;
	}

	const primary = profileDisabled
		? 'Your profile is currently hidden.'
		: "You haven't added any professional credits.";
	const secondary = profileDisabled
		? 'to make your profile public, turn on your Visibility.'
		: 'Add some to allow people to find you in the Directory!';
	const link = profileDisabled ? '/settings' : '/profile/edit';

	return (
		<Alert
			status='warning'
			colorScheme='yellow'
			variant='subtle'
			fontSize='lg'
			justifyContent='space-between'
			{...props}
		>
			<AlertIcon />
			<AlertTitle>{primary}</AlertTitle>
			<AlertDescription>{secondary} </AlertDescription>
			<Spacer />
			<Button as={RouterLink} to={link} colorScheme='yellow'>
				{profileDisabled ? 'Settings' : 'Edit your profile'}
			</Button>
		</Alert>
	);
}

import { Card, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function ProfileDisabledNotice() {
	return (
		<Card borderWidth='2px' borderStyle='dashed' borderColor='whiteAlpha.300' fontSize='sm'>
			<Text>
				<Text as='span' fontStyle='italic' color='brand.orange !important'>
					Your profile is currently hidden.
				</Text>{' '}
				You may still search, but to appear in the directory, turn on your profile's visibility in{' '}
				<Link as={RouterLink} to='/settings'>
					Settings
				</Link>
				.
			</Text>
		</Card>
	);
}

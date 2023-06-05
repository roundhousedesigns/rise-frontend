import { Link } from 'react-router-dom';
import { Box, Heading, Button, Card, Stack } from '@chakra-ui/react';
import Page from '../components/Page';

import useViewer from '../hooks/queries/useViewer';

export default function Dashboard() {
	const { firstName, loggedInSlug } = useViewer();

	return (
		<Page>
			<Heading variant='pageTitle'>Hello, {firstName}!</Heading>
			<Card mt={4}>
				<Heading variant='contentTitle' mb={0}>
					To start a Search, use the button in the header!
				</Heading>
				<Stack direction={['column', 'row']} spacing={4} alignItems={['left', 'center']}>
					<Heading variant='contentTitle' my={0} lineHeight='normal'>
						You can also:
					</Heading>
					<Button as={Link} to={`/profile/${loggedInSlug}`} colorScheme='green' my={0}>
						View your profile
					</Button>
					<Button as={Link} to='/profile/edit' colorScheme='green' my={0}>
						Edit your profile
					</Button>
				</Stack>
				<Box mt={4}>
					<Heading variant='contentTitle'>Need a little guidance?</Heading>
					<Button as={Link} to='/help' colorScheme='orange'>
						Get Help
					</Button>
				</Box>
			</Card>
		</Page>
	);
}

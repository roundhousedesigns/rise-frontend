import { Link } from 'react-router-dom';
import { Box, Heading, Button, Wrap, Card } from '@chakra-ui/react';
import Page from '../components/Page';

import { useViewer } from '../hooks/queries/useViewer';

export default function Dashboard() {
	const { firstName } = useViewer();

	return (
		<Page>
			<Heading variant='pageTitle'>Hello, {firstName}!</Heading>
			<Card mt={4}>
				<Heading variant='contentTitle'>To start a Search, use the button in the header!</Heading>
				<Heading variant='contentTitle'>You can also:</Heading>
				<Wrap direction={['column', 'row']} spacing={4} mt={4}>
					<Button as={Link} to='/profile' colorScheme='green'>
						View your profile
					</Button>
					<Button as={Link} to='/profile/edit' colorScheme='green'>
						Edit your profile
					</Button>
				</Wrap>
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

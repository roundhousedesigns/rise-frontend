import { Box, Heading } from '@chakra-ui/react';
import Page from '../components/Page';
import DashboardView from '../views/DashboardView';

export default function Notfound() {
	return (
		<Page>
			<Heading variant='pageTitle' as='h2'>
				404, friend.
			</Heading>
			<Box>
				<Heading variant='contentTitle'>We couldn't find that page.</Heading>
				<DashboardView />
			</Box>
		</Page>
	);
}

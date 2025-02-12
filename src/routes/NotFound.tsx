import { Box, Divider, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Shell from '@layout/Shell';
import DashboardView from '@views/DashboardView';
import LoggedIn from '@components/LoggedIn';

export default function Notfound() {
	return (
		<Shell>
			<Heading variant='pageTitle' as='h2'>
				404, friend.
			</Heading>
			<Box>
				<Heading variant='contentTitle'>We couldn't find that page. </Heading>
				<Link as={RouterLink} to='/'>
					&larr; Back to RISE
				</Link>
				<Divider />
				<LoggedIn hideOnly={true}>
					<DashboardView />
				</LoggedIn>
			</Box>
		</Shell>
	);
}

import { Box, Heading } from '@chakra-ui/react';
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
				<Heading variant='contentTitle'>
					We couldn't find that page.
				</Heading>
				<LoggedIn hideOnly={true}>
					<DashboardView />
				</LoggedIn>
			</Box>
		</Shell>
	);
}

import { useContext } from 'react';
import { Card, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import Page from '../components/Page';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
	const { loggedInUser } = useContext(AuthContext);

	return (
		<Page title={`Hi, ${loggedInUser.firstName}!`}>
			<Text>A Dashboard with notices, alerts, settings, and/or links goes here.</Text>
			<Card my={4} fontSize='xl'>
				<Text>Nick's List</Text>
				<UnorderedList>
					<ListItem>Search filters click bug</ListItem>
					<ListItem>Credit save bug</ListItem>
					<ListItem>File uploads</ListItem>
				</UnorderedList>
			</Card>
		</Page>
	);
}

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
					<ListItem>Credit save bug</ListItem>
					<ListItem>Style placeholder text (global)</ListItem>
					<ListItem>Search/Reset also on bottom of drawer</ListItem>
					<ListItem>Advanced filters into own section</ListItem>
					<ListItem>File uploads</ListItem>
				</UnorderedList>
			</Card>
		</Page>
	);
}

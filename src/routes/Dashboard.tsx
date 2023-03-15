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
					<ListItem>Add new credit</ListItem>
					<ListItem>{`<Editable>`} height 0 when no `value`</ListItem>
					<ListItem>File uploads</ListItem>
					<ListItem>Credit save bug w/ positions</ListItem>
					<ListItem>Style placeholder text (global)</ListItem>
				</UnorderedList>
			</Card>
		</Page>
	);
}

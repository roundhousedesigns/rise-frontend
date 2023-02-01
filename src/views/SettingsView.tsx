import {
	Card,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Switch,
} from '@chakra-ui/react';

export default function SettingsView() {
	return (
		<>
			<Heading fontSize="lg">Preferences</Heading>
			<Card>
				<Container>
					<FormControl>
						<FormLabel htmlFor="darkMode">Dark Mode</FormLabel>
						<Switch id="darkMode" />
					</FormControl>
				</Container>
			</Card>
		</>
	);
}

import { useContext } from 'react';
import { Heading, Text, Card, Wrap, UnorderedList, ListItem, Link, Box } from '@chakra-ui/react';
import Page from '../components/Page';

export default function Dashboard() {
	return (
		<Page title='Hello!'>
			<Card>
				<Wrap>
					<Text pb={6}>
						Thank you for being a test user for the Alpha version of the directory! Some things to
						keep in mind:
					</Text>
					<Text pb={4}>
						This website and directory is very much still a work in progress, so please be aware of
						that as you are using it and creating a profile. If any bugs or issues arise while
						completing the profile please please email them to us at ______.
					</Text>
					<Text>
						After completion of your user profile please complete{' '}
						<Link
							href='https://docs.google.com/forms/d/e/1FAIpQLScIdkuuoGHWuULA6bI1l5zvaLIaT6KQaK6SznmLMGGQvLzrUQ/viewform?usp=sf_link'
							color='brand.orange'
						>
							this google form
						</Link>{' '}
						to provide feedback on your experience.
					</Text>
					<Box pt={8}>
						<Heading size='lg' my={4}>
							Some other things to keep in mind...
						</Heading>
						<UnorderedList listStylePos='inside' spacing={2}>
							<ListItem fontWeight='bold'>This directory is under ACTIVE DEVELOPMENT.</ListItem>
							<ListItem>
								The site and interface may break layout and/or alignment, especially on smaller
								devices.
							</ListItem>
							<ListItem>
								You will likely encounter bugs, and we'd like you to let us know when you find one!
							</ListItem>
							<ListItem>
								The Search funtionality is limited, as there are currently only a handful of users.
								We'd like you to focus on the profile screens, though you are welcome to click
								anything and everything you see.
							</ListItem>
						</UnorderedList>
					</Box>
				</Wrap>

				<Wrap mt={8}>
					<Heading as='h4' size='lg'>
						Instructions:
					</Heading>
					<Box>
						<Text>
							You can visit your profile by clicking the gray User icon on the right side of the
							site header, and you can start editing your profile by clicking the "Edit" button at
							the top of the page. You can search for other members by using the Search icon in the
							site header, and by clicking through the search prompts, you'll be able to granularly
							select candidates with those attributes and experience points you choose.
						</Text>
					</Box>
				</Wrap>
			</Card>
		</Page>
	);
}

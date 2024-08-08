import {
	Card,
	Heading,
	Button,
	Flex,
	Spacer,
	List,
	ListItem,
	Grid,
	GridItem,
	Box,
	Stack,
} from '@chakra-ui/react';
import { FiEdit3, FiSearch, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useViewer from '@queries/useViewer';
import useUserNotices from '@queries/useUserNotices';
import ShortPost from '@components/ShortPost';
import InlineIconText from '@components/InlineIconText';
import SavedSearchItemList from '../components/SavedSearchItemList';
import StarredProfileList from './StarredProfileList';

export default function DashboardView() {
	const [{ loggedInSlug }] = useViewer();
	const [notices] = useUserNotices();

	return (
		<Grid templateColumns={{ base: '1fr', md: '1fr 400px' }} gap={8} w='full' maxW='none'>
			<GridItem as={Stack} gap={6}>
				<Widget>
					<>
						<Heading as='h2' variant='contentTitle'>
							Getting Started
						</Heading>
						<Card m={0}>
							<Flex justifyContent='space-between' flexWrap='wrap' mb={2}>
								<InlineIconText
									icon={<FiSearch />}
									text='To start a Search, use the star button in the header.'
									query='star'
									description='search'
								/>
								<Flex gap={4} w='full' flexWrap='wrap' mt={4}>
									<Button
										as={Link}
										leftIcon={<FiUser />}
										to={`/profile/${loggedInSlug}`}
										colorScheme='blue'
										my={0}
									>
										View your profile
									</Button>
									<Button
										as={Link}
										leftIcon={<FiEdit3 />}
										to='/profile/edit'
										colorScheme='green'
										my={0}
									>
										Edit your profile
									</Button>
									<Spacer />
								</Flex>
							</Flex>
						</Card>
					</>
				</Widget>

				{notices.length > 0 ? (
					<Widget>
						<>
							<Heading as='h2' variant='contentTitle'>
								Updates
							</Heading>
							<Card m={0}>
								<List spacing={4}>
									{notices.map((notice: any) => (
										<ListItem
											key={notice.id}
											my={0}
											px={0}
											pt={0}
											pb={2}
											borderBottomWidth='1px'
											borderBottomStyle='solid'
											_dark={{ borderColor: 'gray.500' }}
											_light={{ borderColor: 'gray.200' }}
											_last={{ borderBottom: 'none', pb: 0 }}
										>
											<ShortPost post={notice} mb={4} />
										</ListItem>
									))}
								</List>
							</Card>
						</>
					</Widget>
				) : null}
			</GridItem>

			<GridItem as={Stack} gap={6}>
				<Widget>
					<>
						<Heading as='h2' variant='contentTitle'>
							Saved Searches
						</Heading>
						<SavedSearchItemList />
					</>
				</Widget>

				<Widget>
					<>
						<Heading as='h2' variant='contentTitle'>
							Following
						</Heading>
						<StarredProfileList showToggle={false} />
					</>
				</Widget>
			</GridItem>
		</Grid>
	);
}

const Widget = ({ children, ...props }: { children: JSX.Element; [prop: string]: any }) => (
	<Box m={0} {...props}>
		{children}
	</Box>
);

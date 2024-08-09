import {
	Card,
	Heading,
	List,
	ListItem,
	Grid,
	GridItem,
	Box,
	Stack,
	Spinner,
} from '@chakra-ui/react';
import StarredProfileList from '@views/StarredProfileList';
import MiniProfileView from '@views/MiniProfileView';
import useUserProfile from '@queries/useUserProfile';
import useViewer from '@queries/useViewer';
import useUserNotices from '@queries/useUserNotices';
import ShortPost from '@components/ShortPost';
import SavedSearchItemList from '@components/SavedSearchItemList';

export default function DashboardView() {
	const [{ loggedInId }] = useViewer();
	const [notices] = useUserNotices();

	const [profile, { loading }] = useUserProfile(loggedInId);

	return (
		<Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={8} w='full' maxW='none'>
			<GridItem as={Stack} spacing={6} id='dashboard-primary'>
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

				<Widget>
					<>
						<Heading as='h2' variant='contentTitle'>
							Following
						</Heading>
						<StarredProfileList showToggle={false} />
					</>
				</Widget>
			</GridItem>

			<GridItem as={Stack} spacing={6} id='dashboard-secondary'>
				<Widget>
					{profile ? (
						<MiniProfileView profile={profile} allowStar={false} />
					) : loading ? (
						<Spinner />
					) : (
						<></>
					)}
				</Widget>
				<Widget>
					<>
						<Heading as='h2' variant='contentTitle'>
							Saved Searches
						</Heading>
						<SavedSearchItemList />
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

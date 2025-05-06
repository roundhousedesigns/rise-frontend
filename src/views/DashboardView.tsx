import { Card, Heading, List, ListItem, Grid, GridItem, Stack, Spinner } from '@chakra-ui/react';
import StarredProfileList from '@views/StarredProfileList';
import MiniProfileView from '@views/MiniProfileView';
import useUserProfile from '@queries/useUserProfile';
import useViewer from '@queries/useViewer';
import useUserNotices from '@queries/useUserNotices';
import useSavedSearches from '@queries/useSavedSearches';
import Widget from '@common/Widget';
import HeadingCenterline from '@common/HeadingCenterline';
import ShortPost from '@components/ShortPost';
import SavedSearchItemList from '@components/SavedSearchItemList';

export default function DashboardView__Widgets() {
	const [{ loggedInId, starredProfiles }] = useViewer();
	const [notices] = useUserNotices();
	const [savedSearches] = useSavedSearches();

	const [profile, { loading }] = useUserProfile(loggedInId);

	return (
		<Grid
			templateColumns={{ base: '1fr', md: 'minmax(300px, 1fr) auto' }}
			gap={8}
			w='full'
			maxW='6xl'
		>
			<GridItem as={Stack} spacing={4} id={'dashboard-secondary'} maxW='300px'>
				<Widget>
					{profile ? <MiniProfileView profile={profile} /> : loading ? <Spinner /> : <></>}
				</Widget>
				{savedSearches?.length ? (
					<Widget>
						<>
							<Heading as='h2' variant='contentTitle'>
								Saved Searches
							</Heading>
							<SavedSearchItemList />
						</>
					</Widget>
				) : null}
			</GridItem>
			<GridItem as={Stack} spacing={2} id={'dashboard-primary'} justifyContent='flex-start'>
				{notices.length > 0 ? (
					<Widget>
						<>
							<HeadingCenterline lineColor='brand.orange' headingProps={{ fontSize: '2xl' }}>
								News
							</HeadingCenterline>
							<List spacing={4}>
								{notices.map((notice: any) => (
									<ListItem key={notice.id} mt={0}>
										<ShortPost post={notice} mb={4} as={Card} />
									</ListItem>
								))}
							</List>
						</>
					</Widget>
				) : null}

				{starredProfiles?.length ? (
					<Widget>
						<>
							<HeadingCenterline lineColor='brand.orange' headingProps={{ fontSize: '2xl' }}>
								Following
							</HeadingCenterline>
							<StarredProfileList showToggle={false} />
						</>
					</Widget>
				) : null}
			</GridItem>
		</Grid>
	);
}

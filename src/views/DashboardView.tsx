import {
	Card,
	Heading,
	List,
	ListItem,
	Grid,
	GridItem,
	Stack,
	Spinner,
} from '@chakra-ui/react';
import StarredProfileList from '@views/StarredProfileList';
import MiniProfileView from '@views/MiniProfileView';
import useUserProfile from '@queries/useUserProfile';
import useViewer from '@queries/useViewer';
import useUserNotices from '@queries/useUserNotices';
import useSavedSearches from '@queries/useSavedSearches';
import DashboardWidget from '@common/DashboardWidget';
import ShortPost from '@components/ShortPost';
import SavedSearchItemList from '@components/SavedSearchItemList';

// TODO Unimplemented.

export default function DashboardView__DashboardWidgets() {
	const [{ loggedInId, starredProfiles }] = useViewer();
	const [notices] = useUserNotices();
	const [savedSearches] = useSavedSearches();

	const [profile, { loading }] = useUserProfile(loggedInId);

	return (
		<Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={8} w={'full'} maxW={'none'}>
			<GridItem as={Stack} spacing={6} id={'dashboard-primary'}>
				{notices.length > 0 ? (
					<DashboardWidget>
						<>
							<Heading as={'h2'} variant={'contentTitle'}>
								News
							</Heading>
							<List spacing={4}>
								{notices.map((notice: any) => (
									<ListItem key={notice.id}>
										<ShortPost post={notice} mb={4} as={Card} />
									</ListItem>
								))}
							</List>
						</>
					</DashboardWidget>
				) : null}

				{starredProfiles?.length ? (
					<DashboardWidget>
						<>
							<Heading as={'h2'} variant={'contentTitle'}>
								Following
							</Heading>
							<StarredProfileList showToggle={false} />
						</>
					</DashboardWidget>
				) : null}
			</GridItem>

			<GridItem as={Stack} spacing={6} id={'dashboard-secondary'}>
				<DashboardWidget>
					{profile ? (
						<MiniProfileView profile={profile} allowStar={false} />
					) : loading ? (
						<Spinner />
					) : (
						<></>
					)}
				</DashboardWidget>
				{savedSearches?.length ? (
					<DashboardWidget>
						<>
							<Heading as={'h2'} variant={'contentTitle'}>
								Saved Searches
							</Heading>
							<SavedSearchItemList />
						</>
					</DashboardWidget>
				) : null}
			</GridItem>
		</Grid>
	);
}

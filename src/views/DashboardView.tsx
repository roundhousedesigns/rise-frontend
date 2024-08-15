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
import useSavedSearches from '@queries/useSavedSearches';
import ShortPost from '@components/ShortPost';
import SavedSearchItemList from '@components/SavedSearchItemList';

export default function DashboardView() {
	const [{ loggedInId, starredProfiles }] = useViewer();
	const [notices] = useUserNotices();
	const [savedSearches] = useSavedSearches();

	const [profile, { loading }] = useUserProfile(loggedInId);

	return (
		<Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={8} w={'full'} maxW={'none'}>
			<GridItem as={Stack} spacing={6} id={'dashboard-primary'}>
				{notices.length > 0 ? (
					<Widget>
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
					</Widget>
				) : null}

				{starredProfiles?.length ? (
					<Widget>
						<>
							<Heading as={'h2'} variant={'contentTitle'}>
								Following
							</Heading>
							<StarredProfileList showToggle={false} />
						</>
					</Widget>
				) : null}
			</GridItem>

			<GridItem as={Stack} spacing={6} id={'dashboard-secondary'}>
				<Widget>
					{profile ? (
						<MiniProfileView profile={profile} allowStar={false} />
					) : loading ? (
						<Spinner />
					) : (
						<></>
					)}
				</Widget>
				{savedSearches?.length ? (
					<Widget>
						<>
							<Heading as={'h2'} variant={'contentTitle'}>
								Saved Searches
							</Heading>
							<SavedSearchItemList />
						</>
					</Widget>
				) : null}
			</GridItem>
		</Grid>
	);
}

const Widget = ({ children, ...props }: { children: JSX.Element; [prop: string]: any }) => (
	<Box m={0} {...props}>
		{children}
	</Box>
);

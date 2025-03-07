import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Badge, BoxProps, Flex, useToken } from '@chakra-ui/react';
import { FiSearch, FiUser, FiStar, FiFolder, FiBriefcase, FiLink } from 'react-icons/fi';
import SearchDrawer from '@layout/SearchDrawer';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useViewer from '@queries/useViewer';
import useUserProfile from '@queries/useUserProfile';
import useSavedSearches from '@queries/useSavedSearches';
import ProfileNotices from '@common/ProfileNotices';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import MainMenu from '@components/MainMenu';
import RiseStar from '../common/icons/RiseStar';

export default function Sidebar() {
	const [{ loggedInId, loggedInSlug, starredProfiles }] = useViewer();
	const [savedSearches] = useSavedSearches();

	const [profile] = useUserProfile(loggedInId);

	const { drawerIsOpen, openDrawer, closeDrawer } = useContext(SearchDrawerContext);

	const {
		search: { results },
	} = useContext(SearchContext);

	const [orange, gray, textLight, textDark] = useToken('colors', [
		'brand.orange',
		'gray.400',
		'text.light',
		'text.dark',
	]);

	const handleDrawerOpen = () => {
		openDrawer();
	};

	const StarSeparator = () => <RiseStar fontSize='sm' color={gray} my={2} />;

	return loggedInId ? (
		<Box
			id='sidebar'
			w='100px'
			height='100%'
			bg={textDark}
			color={textLight}
			position='absolute'
			top='0'
			left='0'
			zIndex={1000}
		>
			<Container centerContent w='full' maxW='9xl' p={2}>
				<Flex w='full' justifyContent='center'>
					{loggedInId ? (
						<Flex flexDirection='column' alignItems='center'>
							<Box mb={2}>
								<MainMenu />
							</Box>

							<Flex
								color={'text.light'}
								mx={{ base: 0, md: 2 }}
								flexDirection='column'
								alignItems='center'
								gap={2}
							>
								<TooltipIconButton
									icon={<FiBriefcase />}
									label='Jobs'
									as={RouterLink}
									to={'/jobs'}
								/>

								<TooltipIconButton
									icon={
										<FiStar fill={starredProfiles && starredProfiles.length ? orange : 'none'} />
									}
									label={'Starred profiles'}
									as={RouterLink}
									to={'/stars'}
								/>

								<TooltipIconButton
									icon={<FiFolder fill={savedSearches?.length ? orange : 'none'} />}
									as={RouterLink}
									label={'Saved searches'}
									to={'/searches'}
								/>

								{results.length ? (
									<TooltipIconButton
										as={RouterLink}
										to={'/results'}
										icon={
											<Badge
												py={1}
												px={2}
												borderRadius='full'
												variant='subtle'
												colorScheme='orange'
											>
												{results.length}
											</Badge>
										}
										label={'Search results'}
									/>
								) : (
									false
								)}
							</Flex>

							<StarSeparator />

							<Flex
								color={'text.light'}
								mx={2}
								justifyContent={'flex-end'}
								flexDirection='column'
								alignItems='center'
								gap={2}
							>
								<TooltipIconButton
									icon={<FiSearch />}
									onClick={handleDrawerOpen}
									label='Search'
									colorScheme='green'
								/>

								<TooltipIconButton
									icon={<FiUser />}
									as={RouterLink}
									label={'My Profile'}
									colorScheme='blue'
									to={`/profile/${loggedInSlug}`}
								/>
							</Flex>
						</Flex>
					) : (
						false
					)}
				</Flex>
			</Container>

			<SearchDrawer isOpen={drawerIsOpen} onClose={closeDrawer} />

			{profile ? <ProfileNotices /> : false}
		</Box>
	) : null;
}

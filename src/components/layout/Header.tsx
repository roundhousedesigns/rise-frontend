import { useContext, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	IconButton,
	Image,
	Container,
	Link,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	MenuOptionGroup,
	Badge,
	Spacer,
	forwardRef,
	BoxProps,
	Flex,
	useBreakpointValue,
	useToken,
	useColorMode,
} from '@chakra-ui/react';
import {
	FiSearch,
	FiMenu,
	FiLogOut,
	FiSettings,
	FiHome,
	FiUser,
	FiHelpCircle,
	FiCompass,
	FiBookmark,
	FiFileText,
} from 'react-icons/fi';

import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useViewer from '@hooks/queries/useViewer';
import useLogout from '@hooks/mutations/useLogout';
import useUserProfile from '@/hooks/queries/useUserProfile';
import logo from '@assets/images/RISETHEATREDIRECTORY-white logo-slim.svg';
import circleLogo from '@assets/images/rise-blue-circle.png';
import SearchDrawer from '@layout/SearchDrawer';
import ResponsiveButton from '@common/inputs/ResponsiveButton';
import DarkModeToggle from '@components/DarkModeToggle';
import ProfileNotices from '@common/ProfileNotices';

const Header = forwardRef<BoxProps, 'div'>((props, ref) => {
	const { loggedInId, loggedInSlug, bookmarkedProfiles } = useViewer();
	const { logoutMutation } = useLogout();
	const [orange] = useToken('colors', ['brand.orange']);

	const [profile] = useUserProfile(loggedInId);

	const { drawerIsOpen, openDrawer, closeDrawer } = useContext(SearchDrawerContext);
	const drawerButtonRef = useRef(null);
	const { colorMode } = useColorMode();

	const {
		search: { searchActive, results },
	} = useContext(SearchContext);

	const isLargerThanMd = useBreakpointValue(
		{
			base: false,
			md: true,
		},
		{ ssr: false }
	);

	const handleDrawerOpen = () => {
		openDrawer();
	};

	const handleLogout = () => {
		logoutMutation().then(() => {
			window.location.href = '/login';
		});
	};

	const SearchButton = () => (
		<ResponsiveButton
			ref={drawerButtonRef}
			icon={<FiSearch />}
			onClick={handleDrawerOpen}
			label='Search for candidates'
		>
			Search
		</ResponsiveButton>
	);

	const BookmarkedProfilesButton = () => (
		<ResponsiveButton
			as={RouterLink}
			to='/bookmarks'
			icon={
				isLargerThanMd ? (
					<Badge py={1} px={2} ml={0} borderRadius='full' color='dark'>
						{bookmarkedProfiles.length}
					</Badge>
				) : (
					<FiBookmark fill={orange} />
				)
			}
			label='Bookmarked candidates'
		>
			Bookmarked
		</ResponsiveButton>
	);

	const SearchResultsButton = () => (
		<ResponsiveButton
			as={RouterLink}
			to='/results'
			icon={
				isLargerThanMd ? (
					<Badge py={1} px={2} ml={0} borderRadius='full' color='dark'>
						{results.length}
					</Badge>
				) : (
					<FiFileText />
				)
			}
			label='Search results'
		>
			Results
		</ResponsiveButton>
	);

	const MyProfileButton = () => (
		<ResponsiveButton
			as={RouterLink}
			icon={<FiUser />}
			pl={3}
			pr={4}
			label='My Profile'
			to={`/profile/${loggedInSlug}`}
		>
			My Profile
		</ResponsiveButton>
	);

	return (
		<Box
			ref={ref}
			id='header'
			w='full'
			bg='text.dark'
			color='text.light'
			position='fixed'
			top='0'
			borderBottomWidth={2}
			borderBottomColor='text.light'
			zIndex={1000}
		>
			<Container centerContent w='full' maxW='9xl' px={{ base: 4, md: 8 }} py={4}>
				<Flex w='full' justifyContent='space-between' align='center'>
					<Link
						as={RouterLink}
						to='/'
						my={0}
						w='auto'
						display='block'
						maxW={{ base: '50%', md: '350px' }}
						position='relative'
					>
						<Image
							src={logo}
							alt='RISE logo'
							loading='eager'
							h='auto'
							position='relative'
							display='block'
							ml={{ base: 1, md: 4 }}
							pr={3}
						/>
					</Link>

					<Spacer />

					{/* Not logged in */}
					{!loggedInId ? (
						<Link as={RouterLink} to='https://risetheatre.org' my={0} isExternal flex='0 0 auto'>
							<Image src={circleLogo} alt='RISE icon' loading='eager' h={12} />
						</Link>
					) : (
						false
					)}

					{loggedInId ? (
						<>
							<Flex
								color='text.light'
								gap={2}
								mx={2}
								flex='1 0 auto'
								justifyContent='flex-end'
								align='center'
								fontSize='lg'
							>
								{bookmarkedProfiles.length ? <BookmarkedProfilesButton /> : false}
								{searchActive && results.length ? <SearchResultsButton /> : false}
								<SearchButton />
								{isLargerThanMd ? <MyProfileButton /> : null}
							</Flex>
							<Menu>
								<MenuButton
									aria-label='Menu'
									as={IconButton}
									borderRadius='full'
									colorScheme='yellow'
									icon={<FiMenu />}
									size='md'
								/>
								<MenuList zIndex='100' color={colorMode === 'dark' ? 'text.light' : 'text.dark'}>
									{!isLargerThanMd ? (
										<MenuOptionGroup>
											<MenuItem as={RouterLink} to={`/profile/${loggedInSlug}`} icon={<FiHome />}>
												My Profile
											</MenuItem>
											<MenuItem ref={drawerButtonRef} onClick={openDrawer} icon={<FiSearch />}>
												Search
											</MenuItem>
											<MenuDivider />
										</MenuOptionGroup>
									) : (
										false
									)}
									<MenuItem as={RouterLink} to='/' icon={<FiCompass />}>
										Dashboard
									</MenuItem>
									<MenuItem as={RouterLink} to='/bookmarks' icon={<FiBookmark />}>
										Bookmarked Profiles
									</MenuItem>
									<MenuItem as={RouterLink} to='/searches' icon={<FiSearch />}>
										Saved Searches
									</MenuItem>
									<MenuItem as={RouterLink} to='/settings' icon={<FiSettings />}>
										Settings
									</MenuItem>
									<MenuDivider />
									<MenuItem
										as={Link}
										my={0}
										href='https://risetheatre.org'
										icon={<FiHome />}
										isExternal
										_hover={{
											textDecoration: 'none',
										}}
									>
										RISE Home
									</MenuItem>
									<MenuItem as={RouterLink} to='/help' icon={<FiHelpCircle />}>
										Help
									</MenuItem>
									<MenuDivider />
									<Flex mx={2} justifyContent='space-between' alignItems='center'>
										<DarkModeToggle showLabel={false} showHelperText={false} />
										<IconButton
											aria-label='Logout'
											icon={<FiLogOut />}
											boxSize={8}
											onClick={handleLogout}
											variant='ghost'
										/>
									</Flex>
								</MenuList>
							</Menu>
						</>
					) : (
						false
					)}
				</Flex>
			</Container>

			<SearchDrawer isOpen={drawerIsOpen} onClose={closeDrawer} />

			{profile ? <ProfileNotices profile={profile} /> : false}
		</Box>
	);
});

export default Header;

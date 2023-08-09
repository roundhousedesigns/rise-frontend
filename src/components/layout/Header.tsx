import { useContext, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	IconButton,
	Image,
	Container,
	useDisclosure,
	DarkMode,
	Link,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	MenuOptionGroup,
	LightMode,
	Badge,
	Spacer,
	forwardRef,
	BoxProps,
	Flex,
	useBreakpointValue,
	useToken,
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

import SearchDrawer from './SearchDrawer';
import logo from '../../assets/images/RISETHEATREDIRECTORY-white logo-slim.svg';
import circleLogo from '../../assets/images/rise-blue-circle.png';
import { SearchContext } from '../../context/SearchContext';
import useViewer from '../../hooks/queries/useViewer';
import useLogout from '../../hooks/mutations/useLogout';
import ResponsiveButton from '../common/inputs/ResponsiveButton';

const Header = forwardRef<BoxProps, 'div'>((props, ref) => {
	const { loggedInId, loggedInSlug, bookmarkedProfiles } = useViewer();
	const { logoutMutation } = useLogout();
	const [orange] = useToken('colors', ['brand.orange']);

	const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
	const drawerButtonRef = useRef(null);

	const {
		search: { searchActive, results },
		searchDispatch,
	} = useContext(SearchContext);

	const isLargerThanMd = useBreakpointValue(
		{
			base: false,
			md: true,
		},
		{ ssr: false }
	);

	const handleDrawerOpen = () => {
		drawerOnOpen();

		searchDispatch({
			type: 'OPEN_SEARCH',
			payload: {
				searchDrawerClose: drawerOnClose,
			},
		});
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
			zIndex={100}
		>
			<DarkMode>
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
								<LightMode>
									<Menu>
										<DarkMode>
											<MenuButton
												aria-label='Menu'
												as={IconButton}
												borderRadius='full'
												colorScheme='yellow'
												icon={<FiMenu />}
												size='md'
												_active={{
													transform: 'rotate(90deg)',
												}}
											/>
										</DarkMode>
										<MenuList color='text.dark' zIndex='100'>
											{isLargerThanMd ? null : (
												<MenuOptionGroup>
													<MenuItem
														as={RouterLink}
														to={`/profile/${loggedInSlug}`}
														icon={<FiHome />}
													>
														My Profile
													</MenuItem>
													<MenuItem
														ref={drawerButtonRef}
														onClick={drawerOnOpen}
														icon={<FiSearch />}
													>
														Search
													</MenuItem>
													<MenuDivider />
												</MenuOptionGroup>
											)}
											<MenuOptionGroup>
												<MenuItem as={RouterLink} to='/' icon={<FiCompass />}>
													Dashboard
												</MenuItem>
												<MenuItem as={RouterLink} to='/bookmarks' icon={<FiBookmark />}>
													Bookmarked Profiles
												</MenuItem>
											</MenuOptionGroup>
											<MenuOptionGroup>
												<MenuItem as={RouterLink} to='/settings' icon={<FiSettings />}>
													Settings
												</MenuItem>
												<MenuItem as={RouterLink} to='/help' icon={<FiHelpCircle />}>
													Help
												</MenuItem>
											</MenuOptionGroup>
											<MenuDivider />
											<MenuItem
												as={Link}
												href='https://risetheatre.org'
												icon={<FiHome />}
												isExternal
											>
												RISE Home
											</MenuItem>
											<MenuDivider />
											<MenuItem icon={<FiLogOut />} onClick={handleLogout}>
												Logout
											</MenuItem>
										</MenuList>
									</Menu>
								</LightMode>
							</>
						) : (
							false
						)}
					</Flex>
				</Container>
			</DarkMode>

			<SearchDrawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
		</Box>
	);
});

export default Header;

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
	useMediaQuery,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	MenuOptionGroup,
	LightMode,
	Button,
	Badge,
	Spacer,
	forwardRef,
	BoxProps,
	Flex,
	Text,
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
} from 'react-icons/fi';

import SearchDrawer from './SearchDrawer';
import logo from '../../assets/images/RISETHEATREDIRECTORY-white logo-slim.svg';
import circleLogo from '../../assets/images/rise-blue-circle.png';

import { SearchContext } from '../../context/SearchContext';
import useViewer from '../../hooks/queries/useViewer';
import useLogout from '../../hooks/mutations/useLogout';
import ResponsiveButton from '../common/inputs/ResponsiveButton';

const Header = forwardRef<BoxProps, 'div'>((props, ref) => {
	const { logoutMutation } = useLogout();

	const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
	const drawerButtonRef = useRef(null);

	const {
		search: { searchActive, results },
		searchDispatch,
	} = useContext(SearchContext);

	const { loggedInId, loggedInSlug } = useViewer();

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

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
			onClick={handleDrawerOpen}
			icon={<FiSearch />}
			label='Search for candidates'
			colorScheme='gray'
			borderRadius={{ base: 'full', md: 'lg' }}
			size='lg'
			px={{ base: 0, md: 4 }}
		>
			Search
		</ResponsiveButton>
	);

	const SearchResultsButton = () => (
		<Box position='relative'>
			<Button
				as={RouterLink}
				to='/results'
				leftIcon={
					<Badge py={1} px={2} ml={0} borderRadius='full' color='dark'>
						{results.length}
					</Badge>
				}
				aria-label='Search for candidates'
				colorScheme='gray'
				borderRadius={{ base: 'full', md: 'lg' }}
				size='lg'
				textTransform='none'
				pr={{ base: 0, md: 6 }}
				pl={{ base: 0, md: 2 }}
				_before={{
					base: {
						pl: 2,
						content: '""',
					},
					md: {
						pl: 0,
					},
				}}
			>
				<Text as='span' display={{ base: 'none', md: 'block' }}>
					Results
				</Text>
			</Button>
		</Box>
	);

	const MyProfileButton = () => (
		<Button
			leftIcon={<FiUser />}
			pl={3}
			pr={4}
			aria-label='My Profile'
			as={RouterLink}
			to={`/profile/${loggedInSlug}`}
			colorScheme='gray'
			borderRadius='lg'
			size='lg'
			textTransform='none'
		>
			My Profile
		</Button>
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
							maxW={{ base: '50%', md: '400px' }}
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
									textTransform='uppercase'
								>
									{searchActive && results.length ? <SearchResultsButton /> : false}

									<SearchButton />

									{isLargerThanMd ? <MyProfileButton /> : null}
								</Flex>
								<Box m={0} p={0}>
									{
										// HACK Wrapping <Menu> in <Box> removes Chakra CSS warning bug.
										// @link {https://github.com/chakra-ui/chakra-ui/issues/3440}
									}
									<LightMode>
										<Menu>
											<DarkMode>
												<MenuButton
													aria-label='Menu'
													as={IconButton}
													borderRadius='full'
													colorScheme='gray'
													icon={<FiMenu />}
													size='lg'
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
								</Box>
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

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
	Stack,
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
import logo from '../../assets/images/RISETHEATREDIRECTORY-white-logo-050423.png';
import circleLogo from '../../assets/images/rise-blue-circle.png';

import { SearchContext } from '../../context/SearchContext';
import useViewer from '../../hooks/queries/useViewer';
import useLogout from '../../hooks/mutations/useLogout';

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
		<Button
			ref={drawerButtonRef}
			onClick={handleDrawerOpen}
			leftIcon={isLargerThanMd ? <FiSearch /> : undefined}
			aria-label='Search for candidates'
			colorScheme='gray'
			borderRadius={{ base: 'full', md: 'lg' }}
			size='md'
			px={{ base: 0, md: 4 }}
		>
			{isLargerThanMd ? 'Search' : <FiSearch />}
		</Button>
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
				borderRadius='lg'
				size='md'
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
				Results
			</Button>
		</Box>
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
				<Container centerContent w='full' maxW='9xl' pl={0} pr={8}>
					<Stack direction='row' w='full' justifyContent='space-between' align='center'>
						<Link
							as={RouterLink}
							to='/'
							my={0}
							w='auto'
							display='block'
							maxW='400px'
							position='relative'
						>
							<Image
								src={logo}
								alt='RISE logo'
								loading='eager'
								h='auto'
								position='relative'
								display='block'
							/>
						</Link>

						<Spacer />

						{!loggedInId ? (
							<Link as={RouterLink} to='https://risetheatre.org' my={0} isExternal flex='0 0 auto'>
								<Image src={circleLogo} alt='RISE icon' loading='eager' h='100px' py={4} />
							</Link>
						) : (
							false
						)}

						{loggedInId ? (
							<>
								<Stack
									color='text.light'
									direction='row'
									spacing={2}
									mr={6}
									align='center'
									fontSize='lg'
									textTransform='uppercase'
								>
									{searchActive && results.length ? <SearchResultsButton /> : false}

									<SearchButton />

									{isLargerThanMd ? (
										<Button
											leftIcon={<FiUser />}
											pl={3}
											aria-label='My Profile'
											as={RouterLink}
											to={`/profile/${loggedInSlug}`}
											colorScheme='gray'
											borderRadius='lg'
											size='md'
											textTransform='none'
										>
											My Profile
										</Button>
									) : null}
								</Stack>
								<Box>
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
					</Stack>
				</Container>
			</DarkMode>

			<SearchDrawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
		</Box>
	);
});

export default Header;

import { useContext, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	IconButton,
	Image,
	Container,
	useDisclosure,
	DarkMode,
	Spacer,
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
import { useViewer } from '../../hooks/queries/useViewer';
import { useLogout } from '../../hooks/mutations/useLogout';

export default function Header() {
	const { logoutMutation } = useLogout();

	const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
	const drawerButtonRef = useRef(null);

	const {
		search: { searchActive, results },
	} = useContext(SearchContext);

	const { loggedInId } = useViewer();

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const handleLogout = () => {
		logoutMutation().then(() => {
			window.location.href = '/login';
		});
	};

	const SearchButton = () => (
		<Button
			ref={drawerButtonRef}
			onClick={drawerOnOpen}
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
		<Box flex='0 0 auto' w='full'>
			<DarkMode>
				<Box id='header' w='full' bg='text.dark' color='text.light'>
					<Container centerContent w='full' maxW='9xl' pl={0} pr={8}>
						<Stack
							direction='row'
							w='100%'
							justifyContent='space-between'
							align='center'
							flexWrap='wrap'
						>
							<Link as={RouterLink} to='/' my={0}>
								<Image src={logo} alt='RISE logo' loading='eager' h='100px' />
							</Link>

							<Spacer />

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
												to='/profile'
												colorScheme='gray'
												borderRadius='lg'
												size='md'
												textTransform='none'
											>
												My Profile
											</Button>
										) : null}
									</Stack>
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
														<MenuItem as={RouterLink} to='/profile' icon={<FiHome />}>
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
								</>
							) : (
								<>
									<Link as={RouterLink} to='https://risetheatre.org' my={0} isExternal>
										<Image src={circleLogo} alt='RISE icon' loading='eager' h='100px' py={4} />
									</Link>
								</>
							)}
						</Stack>
					</Container>
				</Box>
			</DarkMode>

			<SearchDrawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
		</Box>
	);
}

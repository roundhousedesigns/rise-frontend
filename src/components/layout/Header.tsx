import { useContext, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
	Badge,
	Button,
} from '@chakra-ui/react';

import { FiSearch, FiMenu, FiLogOut, FiSettings, FiHome, FiUser } from 'react-icons/fi';

import SearchDrawer from './SearchDrawer';
import logo from '../../assets/images/gtw-logo-horizontal.svg';
import LoggedIn from '../LoggedIn';

import { SearchContext } from '../../context/SearchContext';

export default function Header() {
	const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
	const drawerButtonRef = useRef(null);

	const {
		search: { searchActive, results },
	} = useContext(SearchContext);

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.setItem('authToken', '');
		sessionStorage.setItem('refreshToken', '');
		sessionStorage.setItem('loggedInId', '');
		window.location.href = '/';
	};

	const SearchButton = () => (
		<Box position='relative'>
			<Button
				ref={drawerButtonRef}
				onClick={drawerOnOpen}
				leftIcon={<FiSearch />}
				aria-label='Search for candidates'
				variant='invisible'
				bg='whiteAlpha.400'
				borderRadius='full'
				size='lg'
				fontSize='xl'
				pr={{ base: 0, md: 6 }}
				pl={{ base: 0, md: 5 }}
				_hover={{ bg: 'whiteAlpha.600' }}
				_active={{ bg: 'whiteAlpha.600' }}
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
				{isLargerThanMd ? 'Search' : ''}
			</Button>
			{searchActive && results.length ? (
				<Badge
					fontSize='md'
					px={2}
					py='0em'
					display='flex'
					alignItems='center'
					justifyContent='center'
					borderRadius='full'
					color='brand.teal'
					bg='white'
					position='absolute'
					bottom='-6px'
					left='130px'
					textAlign='left'
				>
					{results.length}
				</Badge>
			) : null}
		</Box>
	);

	return (
		<Box flex='0 0 auto' w='full'>
			<DarkMode>
				<Box id='header' w='full' bg='text.dark' py={3} color='text.light'>
					<Container centerContent w='full' maxW='9xl'>
						<Stack
							direction='row'
							w='100%'
							justifyContent='space-between'
							align='center'
							flexWrap='wrap'
						>
							<Link as={RouterLink} to='/'>
								<Image
									src={logo}
									w={{ base: '200px', sm: 'auto' }}
									alt='Get To Work logo'
									loading='eager'
									h='40px'
								/>
							</Link>
							<LoggedIn redirect={false}>
								<Spacer />
								<Stack
									color='white'
									direction='row'
									spacing={4}
									mr={6}
									align='center'
									fontSize='lg'
									textTransform='uppercase'
								>
									<SearchButton />
									{/* TODO change profile icon for <Avatar> */}
									{isLargerThanMd ? (
										<Button
											leftIcon={<FiUser />}
											aria-label='My Profile'
											as={RouterLink}
											to='/profile'
											variant='invisible'
											bg='whiteAlpha.400'
											borderRadius='full'
											size='lg'
											fontSize='xl'
											_hover={{ bg: 'whiteAlpha.600' }}
											_active={{ bg: 'whiteAlpha.600' }}
											textTransform='none'
										>
											My Profile
										</Button>
									) : null}
								</Stack>

								<Box pl={2}>
									<LightMode>
										{
											// HACK Wrapping <Menu> in <Box> removes Chakra CSS warning bug.
											// @link {https://github.com/chakra-ui/chakra-ui/issues/3440}
										}
										<Menu>
											<MenuButton
												aria-label='Menu'
												as={IconButton}
												borderRadius='full'
												bg='whiteAlpha.600'
												_hover={{ bg: 'whiteAlpha.800' }}
												_active={{ bg: 'blue.300' }}
												icon={<FiMenu />}
												size='lg'
											/>
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
													<MenuItem as={RouterLink} to='/' icon={<FiHome />}>
														Dashboard
													</MenuItem>
												</MenuOptionGroup>
												<MenuOptionGroup>
													<MenuItem as={RouterLink} to='/settings' icon={<FiSettings />}>
														Settings
													</MenuItem>
												</MenuOptionGroup>
												<MenuDivider />
												<MenuItem icon={<FiLogOut />} onClick={handleLogout}>
													Logout
												</MenuItem>
											</MenuList>
										</Menu>
									</LightMode>
								</Box>
							</LoggedIn>
						</Stack>
					</Container>
				</Box>
			</DarkMode>

			<SearchDrawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
		</Box>
	);
}

import { useContext, useRef } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
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
	Avatar,
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
				leftIcon={<FiSearch />}
				aria-label='Search for candidates'
				variant='invisible'
				bg='whiteAlpha.400'
				borderRadius='full'
				size='lg'
				fontSize='xl'
				_hover={{ bg: 'whiteAlpha.600' }}
				_active={{ bg: 'whiteAlpha.600' }}
				onClick={drawerOnOpen}
			>
				Search
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
								<Image src={logo} alt='Get To Work logo' loading='eager' w='auto' h='40px' />
							</Link>
							<LoggedIn redirect={false}>
								<Spacer />
								{isLargerThanMd ? (
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
										{/* TODO add Avatar by pulling in user profile data */}
										{/*
										<Link variant='nav' as={RouterLink} to='/profile'>
											<Avatar
												size='md'
												bg='whiteAlpha.600'
												_hover={{ bg: 'whiteAlpha.700' }}
												transitionDuration='normal'
											/>
										</Link>
										*/}
										<Button
											leftIcon={<FiUser />}
											aria-label='Search for candidates'
											variant='invisible'
											bg='whiteAlpha.400'
											borderRadius='full'
											size='lg'
											fontSize='xl'
											_hover={{ bg: 'whiteAlpha.600' }}
											_active={{ bg: 'whiteAlpha.600' }}
											onClick={() => navigate('/profile')}
										>
											My Profile
										</Button>
									</Stack>
								) : null}

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
												{isLargerThanMd ? (
													<>
														<MenuOptionGroup>
															<MenuItem as={RouterLink} to='/' icon={<FiHome />}>
																Dashboard
															</MenuItem>
														</MenuOptionGroup>
														<MenuDivider />
													</>
												) : null}
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

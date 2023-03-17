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
	Avatar,
	Badge,
} from '@chakra-ui/react';

import { FiSearch, FiMenu, FiLogOut, FiSettings, FiHome, FiUser } from 'react-icons/fi';

import SearchDrawer from './SearchDrawer';
import logo from '../../assets/images/gtw-logo-horizontal.svg';
import LoggedIn from '../LoggedIn';

import { SearchContext } from '../../context/SearchContext';

export default function Header() {
	const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
	const drawerButtonRef = useRef(null);

	const navigate = useNavigate();

	const {
		search: { searchActive, results },
	} = useContext(SearchContext);

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const handleLogout = () => {
		sessionStorage.setItem('jwt', '');
		sessionStorage.setItem('loggedInId', '');
		window.location.href = '/';
	};

	const SearchButton = () => (
		<Box position='relative'>
			<IconButton
				ref={drawerButtonRef}
				icon={<FiSearch />}
				aria-label='Search for candidates'
				variant='invisible'
				bg='whiteAlpha.400'
				borderRadius='full'
				size='lg'
				fontSize='3xl'
				_hover={{ bg: 'whiteAlpha.600' }}
				_active={{ bg: 'whiteAlpha.600' }}
				onClick={drawerOnOpen}
			/>
			{searchActive && results.length ? (
				<Badge
					fontSize='xs'
					px={2}
					py='0.1em'
					display='flex'
					alignItems='center'
					justifyContent='center'
					borderRadius='full'
					color='brand.cyan'
					bg='white'
					position='absolute'
					bottom='-11px'
					left='30px'
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
										<Link variant='nav' as={RouterLink} to='/profile'>
											<Avatar
												size='md'
												bg='whiteAlpha.600'
												_hover={{ bg: 'whiteAlpha.700' }}
												transitionDuration='normal'
											/>
										</Link>
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
												bg='whiteAlpha.700'
												_hover={{ bg: 'whiteAlpha.800' }}
												_active={{ bg: 'blue.300' }}
												icon={<FiMenu />}
												size='lg'
											/>
											<MenuList color='text.dark'>
												{isLargerThanMd ? (
													<>
														<MenuOptionGroup>
															<MenuItem as={RouterLink} to='/' icon={<FiHome />}>
																Dashboard
															</MenuItem>
															<MenuItem as={RouterLink} to='/profile' icon={<FiUser />}>
																My Profile
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

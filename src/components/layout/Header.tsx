import { useContext, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	IconButton,
	Image,
	Container,
	useDisclosure,
	LightMode,
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
} from '@chakra-ui/react';

// TODO switch logout icon to simple nav menu w/ logout in it
import { FiSearch, FiMenu, FiLogOut, FiSettings, FiHome } from 'react-icons/fi';

import SearchDrawer from './SearchDrawer';
import logo from '../../assets/images/gtw-logo-horizontal.svg';
import LoggedIn from '../LoggedIn';

import { useLogout } from '../../hooks/mutations/useLogout';
import { AuthContext } from '../../context/AuthContext';

export default function Header() {
	const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
	const drawerButtonRef = useRef(null);

	const { setLoggedInUser } = useContext(AuthContext);
	const { logoutMutation } = useLogout();

	const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

	const handleLogout = () => {
		logoutMutation().then(() => {
			setLoggedInUser({ id: 0, firstName: '', lastName: '' });
		});
	};

	return (
		<Box flex='0 0 auto' w='full'>
			<LightMode>
				<Box id='header' w='full' bg='black' py={3} color='white'>
					<Container centerContent w='full' maxWidth='9xl'>
						<Stack
							direction='row'
							w='100%'
							justifyContent='space-between'
							align='center'
							flexWrap='wrap'
						>
							<LoggedIn>
								{/* {searchActive ? ( */}
								<IconButton
									ref={drawerButtonRef}
									icon={<FiSearch />}
									aria-label='Search for candidates'
									variant='invisible'
									fontSize='3xl'
									onClick={drawerOnOpen}
								/>
								{/* ) : null} */}
							</LoggedIn>
							<Link as={RouterLink} to='/'>
								<Image src={logo} alt='Get To Work logo' loading='eager' w='auto' h='40px' />
							</Link>
							<LoggedIn redirect={false}>
								{isLargerThan768 ? (
									<>
										<Spacer />
										<Stack
											direction='row'
											spacing={4}
											mr={6}
											align='center'
											fontSize='lg'
											textTransform='uppercase'
										>
											<Link as={RouterLink} to='/search'>
												Search
											</Link>
											<Link as={RouterLink} to='/profile'>
												My Profile
											</Link>
										</Stack>
									</>
								) : null}

								<Box>
									{/* HACK Wrapping <Menu> in <Box> removes Chakra CSS warning bug. */}
									<Menu>
										<MenuButton
											aria-label='Menu'
											as={IconButton}
											variant='round'
											bg='brand.blue'
											_active={{ bg: 'brand.cyan' }}
											icon={<FiMenu />}
											size='lg'
										/>
										<MenuList color='black'>
											<MenuOptionGroup>
												<MenuItem as={RouterLink} to='/' icon={<FiHome />}>
													Dashboard
												</MenuItem>
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
								</Box>
							</LoggedIn>
						</Stack>
					</Container>
				</Box>
			</LightMode>

			<SearchDrawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
		</Box>
	);
}

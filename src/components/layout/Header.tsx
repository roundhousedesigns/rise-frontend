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
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiLogOut } from 'react-icons/fi';

import { useLogout } from './mutations/useLogout';
import { AuthContext } from '../../context/AuthContext';
import Drawer from './SearchDrawer';
import logo from '../../assets/images/gtw-logo-horizontal.svg';
import LoggedIn from '../LoggedIn';

export default function Header() {
	const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
	const btnRef = useRef(null);
	const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

	const { setLoggedInUser } = useContext(AuthContext);
	const { logoutMutation } = useLogout();

	const handleLogout = () => {
		logoutMutation().then(() => {
			setLoggedInUser('');
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
								<IconButton
									ref={btnRef}
									icon={<FiMoreHorizontal />}
									aria-label='Search for candidates'
									variant='invisible'
									fontSize='3xl'
									onClick={drawerOnOpen}
								/>
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

								<IconButton
									variant='round'
									borderColor='white'
									aria-label='Log out'
									icon={<FiLogOut />}
									onClick={handleLogout}
								/>
							</LoggedIn>
						</Stack>
					</Container>
				</Box>
			</LightMode>

			<Drawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
		</Box>
	);
}

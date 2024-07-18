import {
	Flex,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	MenuOptionGroup,
	useBreakpointValue,
	useColorMode,
} from '@chakra-ui/react';
import {
	FiMenu,
	FiHome,
	FiCompass,
	FiStar,
	FiFolder,
	FiSettings,
	FiHelpCircle,
	FiLogOut,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import useViewer from '@hooks/queries/useViewer';
import useLogout from '@hooks/mutations/useLogout';
import DarkModeToggle from '@components/DarkModeToggle';

export default function MainMenu() {
	const [{ loggedInSlug }] = useViewer();
	const { logoutMutation } = useLogout();

	const isLargerThanMd = useBreakpointValue(
		{
			base: false,
			md: true,
		},
		{ ssr: false }
	);
	const { colorMode } = useColorMode();

	/**
	 * Logs out the user by performing a mutation and redirecting to the login page.
	 */
	const logout = (): void => {
		logoutMutation().then(() => {
			window.location.href = '/login';
		});
	};

	return (
		<Menu>
			<MenuButton
				aria-label='Menu'
				as={IconButton}
				borderRadius='full'
				colorScheme='yellow'
				icon={<FiMenu />}
				size='sm'
			/>
			<MenuList zIndex='100' color={colorMode === 'dark' ? 'text.light' : 'text.dark'}>
				{!isLargerThanMd ? (
					<MenuOptionGroup>
						<MenuItem as={RouterLink} to={`/profile/${loggedInSlug}`} icon={<FiHome />}>
							My Profile
						</MenuItem>
						<MenuDivider />
					</MenuOptionGroup>
				) : (
					false
				)}
				<MenuItem as={RouterLink} to='/' icon={<FiCompass />}>
					Dashboard
				</MenuItem>
				<MenuItem as={RouterLink} to='/starred' icon={<FiStar />}>
					Starred Profiles
				</MenuItem>
				<MenuItem as={RouterLink} to='/searches' icon={<FiFolder />}>
					Your Searches
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
						onClick={logout}
						variant='ghost'
					/>
				</Flex>
			</MenuList>
		</Menu>
	);
}

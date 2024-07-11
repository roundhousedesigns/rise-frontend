import { useContext, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	IconButton,
	Image,
	Container,
	Link,
	Badge,
	Spacer,
	forwardRef,
	BoxProps,
	Flex,
	useBreakpointValue,
	useToken,
	ButtonGroup,
} from '@chakra-ui/react';
import { FiSearch, FiUser, FiBookmark, FiFileText, FiTag } from 'react-icons/fi';
import logo from '@assets/images/RISETHEATREDIRECTORY-white logo-slim.svg';
import circleLogo from '@assets/images/rise-blue-circle.png';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useViewer from '@hooks/queries/useViewer';
import useUserProfile from '@hooks/queries/useUserProfile';
import SearchDrawer from '@layout/SearchDrawer';
import ResponsiveButton from '@common/inputs/ResponsiveButton';
import ProfileNotices from '@common/ProfileNotices';
import MainMenu from '@components/MainMenu';

const Header = forwardRef<BoxProps, 'div'>((props, ref) => {
	const { loggedInId, loggedInSlug, bookmarkedProfiles } = useViewer();
	const [orange] = useToken('colors', ['brand.orange']);

	const [profile] = useUserProfile(loggedInId);

	const { drawerIsOpen, openDrawer, closeDrawer } = useContext(SearchDrawerContext);
	const drawerButtonRef = useRef(null);

	const {
		search: { results },
	} = useContext(SearchContext);

	const isLargerThanMd = useBreakpointValue(
		{
			base: false,
			md: true,
		},
		{ ssr: false }
	);

	const handleDrawerOpen = () => {
		openDrawer();
	};

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
			zIndex={1000}
		>
			<Container centerContent w='full' maxW='9xl' p={2}>
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
							mt={1}
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
							<ButtonGroup
								color='text.light'
								mx={2}
								flex='1 0 auto'
								justifyContent='flex-end'
								size='md'
							>
								<IconButton
									as={RouterLink}
									icon={<FiBookmark fill={bookmarkedProfiles.length ? orange : 'none'} />}
									aria-label='Bookmarked profiles'
									to='/bookmarks'
									isDisabled={!bookmarkedProfiles.length}
								/>

								<IconButton
									as={RouterLink}
									icon={<FiTag />}
									aria-label='Saved searches'
									to='/searches'
								/>

								{results.length ? (
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
								) : (
									false
								)}

								{isLargerThanMd ? (
									<IconButton
										as={RouterLink}
										icon={<FiUser />}
										aria-label='My Profile'
										to={`/profile/${loggedInSlug}`}
									/>
								) : (
									false
								)}

								<IconButton
									ref={drawerButtonRef}
									icon={<FiSearch />}
									onClick={handleDrawerOpen}
									aria-label='Search profiles'
									colorScheme='green'
								>
									Search
								</IconButton>
							</ButtonGroup>

							<MainMenu />
						</>
					) : (
						false
					)}
				</Flex>
			</Container>

			<SearchDrawer isOpen={drawerIsOpen} onClose={closeDrawer} />

			{profile ? <ProfileNotices /> : false}
		</Box>
	);
});

export default Header;

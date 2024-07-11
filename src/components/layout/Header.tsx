import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	Image,
	Container,
	Link,
	Badge,
	Spacer,
	forwardRef,
	BoxProps,
	Flex,
	useBreakpointValue,
	ButtonGroup,
	Icon,
	useToken,
} from '@chakra-ui/react';
import { FiSearch, FiUser, FiBookmark, FiFileText, FiPaperclip } from 'react-icons/fi';
import logo from '@assets/images/RISETHEATREDIRECTORY-white logo-slim.svg';
import circleLogo from '@assets/images/rise-blue-circle.png';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useViewer from '@hooks/queries/useViewer';
import useUserProfile from '@hooks/queries/useUserProfile';
import SearchDrawer from '@layout/SearchDrawer';
import ProfileNotices from '@common/ProfileNotices';
import MainMenu from '@components/MainMenu';
import TooltipIconButton from '../common/TooltipIconButton';

const Header = forwardRef<BoxProps, 'div'>((props, ref) => {
	const { loggedInId, loggedInSlug, bookmarkedProfiles } = useViewer();

	const [profile] = useUserProfile(loggedInId);

	const { drawerIsOpen, openDrawer, closeDrawer } = useContext(SearchDrawerContext);

	const {
		search: { results },
	} = useContext(SearchContext);

	const [orange] = useToken('colors', ['orange.300']);
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

					{/* Logged in */}
					{loggedInId ? (
						<Flex alignItems='center'>
							<ButtonGroup
								color='text.light'
								mx={2}
								flex='1 0 auto'
								justifyContent='flex-end'
								size='md'
							>
								<TooltipIconButton
									icon={<FiBookmark fill={bookmarkedProfiles.length ? orange : 'none'} />}
									label='Bookmarked profiles'
									as={RouterLink}
									to='/bookmarks'
									isDisabled={!bookmarkedProfiles.length}
								/>

								<TooltipIconButton
									icon={<FiPaperclip />}
									as={RouterLink}
									label='Saved searches'
									to='/searches'
								/>

								{results.length ? (
									<TooltipIconButton
										as={RouterLink}
										to='/results'
										icon={
											isLargerThanMd ? (
												<Badge
													py={1}
													px={2}
													borderRadius='full'
													variant='subtle'
													colorScheme='orange'
												>
													{results.length}
												</Badge>
											) : (
												<FiFileText />
											)
										}
										label='Search results'
									/>
								) : (
									false
								)}
							</ButtonGroup>
							<Icon aria-label='Separator' viewBox='0 0 200 200' color='gray.50' boxSize={2}>
								<path
									stroke='currentColor'
									strokeWidth={5}
									d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
								/>
							</Icon>
							<ButtonGroup
								color='text.light'
								mx={2}
								flex='1 0 auto'
								justifyContent='flex-end'
								size='md'
							>
								<TooltipIconButton
									icon={<FiSearch />}
									onClick={handleDrawerOpen}
									label='Search'
									colorScheme='green'
								/>

								{isLargerThanMd ? (
									<TooltipIconButton
										icon={<FiUser />}
										as={RouterLink}
										label='My Profile'
										colorScheme='blue'
										to={`/profile/${loggedInSlug}`}
									/>
								) : (
									false
								)}
							</ButtonGroup>

							<MainMenu />
						</Flex>
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

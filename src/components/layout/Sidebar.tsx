import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Badge, Flex, useToken, Spacer, Stack } from '@chakra-ui/react';
import { FiSearch, FiUser, FiStar, FiFolder, FiBriefcase, FiSettings } from 'react-icons/fi';
import SearchDrawer from '@layout/SearchDrawer';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useViewer from '@queries/useViewer';
import useSavedSearches from '@queries/useSavedSearches';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import DarkModeToggle from '../DarkModeToggle';
import DisableProfileToggle from '../DisableProfileToggle';

export default function Sidebar() {
	const [{ loggedInId, loggedInSlug, starredProfiles }] = useViewer();
	const [savedSearches] = useSavedSearches();
	const [orange] = useToken('colors', ['brand.orange']);

	const { drawerIsOpen, openDrawer, closeDrawer } = useContext(SearchDrawerContext);

	const {
		search: { results },
	} = useContext(SearchContext);

	const handleDrawerOpen = () => {
		openDrawer();
	};

	return loggedInId ? (
		<Box id='sidebar' w='auto' py={2} bg='blackAlpha.700' color='text.light'>
			<Flex
				h='full'
				color={'text.light'}
				mt={2}
				mx={{ base: 0, md: 2 }}
				pb={4}
				flexDirection='column'
				alignItems='center'
				justifyContent='space-between'
				gap={2}
			>
				<TooltipIconButton
					icon={<FiSearch />}
					onClick={handleDrawerOpen}
					label='Search'
					colorScheme='green'
				/>
				<TooltipIconButton
					icon={<FiUser />}
					as={RouterLink}
					label={'My Profile'}
					colorScheme='blue'
					to={`/profile/${loggedInSlug}`}
				/>
				<TooltipIconButton icon={<FiBriefcase />} label='Jobs' as={RouterLink} to={'/jobs'} />
				<TooltipIconButton
					icon={<FiStar fill={starredProfiles ? orange : 'none'} />}
					label={'Starred profiles'}
					as={RouterLink}
					to={'/stars'}
				/>
				<TooltipIconButton
					icon={<FiFolder fill={savedSearches?.length ? orange : 'none'} />}
					as={RouterLink}
					label={'Saved searches'}
					to={'/searches'}
				/>
				{results.length ? (
					<TooltipIconButton
						as={RouterLink}
						to={'/results'}
						icon={
							<Badge py={1} px={2} borderRadius='full' variant='subtle' colorScheme='orange'>
								{results.length}
							</Badge>
						}
						label={'Search results'}
					/>
				) : (
					false
				)}
				<TooltipIconButton
					icon={<FiSettings />}
					as={RouterLink}
					label={'Settings'}
					colorScheme='yellow'
					to={`/settings`}
				/>

				<Spacer />

				<DarkModeToggle showLabel={false} showHelperText={false} />
			</Flex>

			<SearchDrawer isOpen={drawerIsOpen} onClose={closeDrawer} />
		</Box>
	) : null;
}

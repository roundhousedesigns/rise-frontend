import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Badge, Flex, useToken } from '@chakra-ui/react';
import { FiSearch, FiUser, FiStar, FiFolder, FiBriefcase, FiSettings } from 'react-icons/fi';
import SearchDrawer from '@layout/SearchDrawer';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useViewer from '@queries/useViewer';
import useSavedSearches from '@queries/useSavedSearches';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

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
		<Box id='sidebar' w='100px' pt={2} pb={4} bg='blackAlpha.700' color='text.light'>
			<Container centerContent w='full' maxW='9xl' p={2}>
				<Flex flexDirection='column' alignItems='center'>
					<Flex
						color={'text.light'}
						mx={{ base: 0, md: 2 }}
						flexDirection='column'
						alignItems='center'
						gap={2}
					>
						<TooltipIconButton
							icon={<FiSearch />}
							onClick={handleDrawerOpen}
							label='Search'
							colorScheme='green'
							size='sm'
						/>

						<TooltipIconButton
							icon={<FiUser />}
							as={RouterLink}
							label={'My Profile'}
							colorScheme='blue'
							to={`/profile/${loggedInSlug}`}
							size='sm'
						/>

						<TooltipIconButton
							icon={<FiBriefcase />}
							label='Jobs'
							as={RouterLink}
							to={'/jobs'}
							size='sm'
						/>

						<TooltipIconButton
							icon={<FiStar fill={starredProfiles ? orange : 'none'} />}
							label={'Starred profiles'}
							as={RouterLink}
							to={'/stars'}
							size='sm'
						/>

						<TooltipIconButton
							icon={<FiFolder fill={savedSearches?.length ? orange : 'none'} />}
							as={RouterLink}
							label={'Saved searches'}
							to={'/searches'}
							size='sm'
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
								size='sm'
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
							size='sm'
						/>
					</Flex>
				</Flex>
			</Container>

			<SearchDrawer isOpen={drawerIsOpen} onClose={closeDrawer} />
		</Box>
	) : null;
}

import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Badge, Flex } from '@chakra-ui/react';
import {
	FiSearch,
	FiUser,
	FiStar,
	FiFolder,
	FiBriefcase,
	FiLink,
	FiSettings,
} from 'react-icons/fi';
import SearchDrawer from '@layout/SearchDrawer';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useViewer from '@queries/useViewer';
import useSavedSearches from '@queries/useSavedSearches';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

export default function Sidebar() {
	const [{ loggedInId, loggedInSlug, starredProfiles }] = useViewer();
	const [savedSearches] = useSavedSearches();

	const { drawerIsOpen, openDrawer, closeDrawer } = useContext(SearchDrawerContext);

	const {
		search: { results },
	} = useContext(SearchContext);

	const handleDrawerOpen = () => {
		openDrawer();
	};

	return loggedInId ? (
		<Box id='sidebar' w='100px' height='100%' pt={2} bg='text.dark' color='text.light'>
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
							icon={
								<FiStar
									fill={starredProfiles && starredProfiles.length ? 'brand.orange' : 'none'}
								/>
							}
							label={'Starred profiles'}
							as={RouterLink}
							to={'/stars'}
						/>

						<TooltipIconButton
							icon={<FiFolder fill={savedSearches?.length ? 'brand.orange' : 'none'} />}
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
					</Flex>
				</Flex>
			</Container>

			<SearchDrawer isOpen={drawerIsOpen} onClose={closeDrawer} />
		</Box>
	) : null;
}

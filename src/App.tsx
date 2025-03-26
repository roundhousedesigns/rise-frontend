/**
 * Copyright (c) 2024 Maestra Music and Roundhouse Designs. All rights reserved.
 */

import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { SearchContextProvider } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useViewer from '@queries/useViewer';
import useUserProfile from '@queries/useUserProfile';
import Sidebar from '@layout/Sidebar';
import Main from '@layout/Main';
import ProfileNotices from '@common/ProfileNotices';

export default function App() {
	const { isOpen: drawerIsOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
	const [{ loggedInId }] = useViewer();
	const [profile] = useUserProfile(loggedInId);

	return (
		<Box
			id='app-root'
			_dark={{
				bg: 'bg.dark',
				color: 'text.light',
			}}
			_light={{
				bg: 'bg.light',
				color: 'text.dark',
			}}
		>
			<SearchContextProvider>
				<SearchDrawerContext.Provider value={{ drawerIsOpen, openDrawer, closeDrawer }}>
					<Box w='full' h='100%' overflow='auto' justifyContent={'space-between'} gap={0}>
						<Flex w='full' h='100%' justifyContent='flex-start' gap={4}>
							{profile ? <ProfileNotices /> : false}

							<Sidebar />
							<Main />
						</Flex>
					</Box>
				</SearchDrawerContext.Provider>
			</SearchContextProvider>
		</Box>
	);
}

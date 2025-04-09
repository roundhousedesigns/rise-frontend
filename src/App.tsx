/**
 * Copyright (c) 2024 Maestra Music and Roundhouse Designs. All rights reserved.
 */

import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { SearchContextProvider } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import Sidebar from '@layout/Sidebar';
import Main from '@layout/Main';

export default function App() {
	const { isOpen: drawerIsOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();

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
						<Flex w='full' h='100%' justifyContent='flex-start'>
							<Sidebar />
							<Main />
						</Flex>
					</Box>
				</SearchDrawerContext.Provider>
			</SearchContextProvider>
		</Box>
	);
}

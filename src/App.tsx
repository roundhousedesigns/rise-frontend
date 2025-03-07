/**
 * Copyright (c) 2024 Maestra Music and Roundhouse Designs. All rights reserved.
 */

import { Box, Flex, Spacer, Stack, Text, chakra, useDisclosure } from '@chakra-ui/react';
import { SearchContextProvider } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import Sidebar from '@layout/Sidebar';
import Main from '@layout/Main';
import WordPressStyles from '@components/WordPressStyles';

export default function App() {
	const { isOpen: drawerIsOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();

	return (
		<>
			<WordPressStyles />
			<SearchContextProvider>
				<Box
					minH={'-webkit-fill-available'}
					_dark={{
						bg: 'bg.dark',
						color: 'text.light',
					}}
					_light={{
						bg: 'bg.light',
						color: 'text.dark',
					}}
				>
					<SearchDrawerContext.Provider value={{ drawerIsOpen, openDrawer, closeDrawer }}>
						<Stack w='full' overflow='auto' justifyContent={'space-between'} gap={0}>
							<Flex w='full' position='relative'>
								<Sidebar />
								<Main />
							</Flex>
						</Stack>
					</SearchDrawerContext.Provider>
				</Box>
			</SearchContextProvider>
		</>
	);
}

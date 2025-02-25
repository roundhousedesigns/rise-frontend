/**
 * Copyright (c) 2024 Maestra Music and Roundhouse Designs. All rights reserved.
 */

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Spacer, Stack, Text, chakra, useDisclosure } from '@chakra-ui/react';
import pkgJSON from '@@/package.json';
import { SearchContextProvider } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import Header from '@layout/Header';
import Main from '@layout/Main';
import Footer from '@layout/Footer';
import WordPressStyles from '@components/WordPressStyles';

const __APP_VERSION__ = `v${pkgJSON.version}`;

// Hooks
import DevMode from './dev/DevMode';

export default function App() {
	const { isOpen: drawerIsOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();

	// Get the header height so we can offset the main content
	const headerRef = useRef(null);
	const [headerHeight, setHeaderHeight] = useState<number>(0);

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { height } = entry.contentRect;
				setHeaderHeight(height);
			}
		});

		if (headerRef.current) {
			observer.observe(headerRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [headerRef.current]);

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
						<Stack h='100vh' w='full' overflow='auto' justifyContent={'space-between'} gap={0}>
							<Header ref={headerRef} />
							<Box h='auto' w='full' /* paddingTop={`${headerHeight}px`} */>
								<Main pt={`${headerHeight}px`} />
							</Box>
							<Spacer />
							<Footer />
						</Stack>
					</SearchDrawerContext.Provider>
					<DevMode>
						<Flex
							w='100vw'
							position='fixed'
							bottom={0}
							left={0}
							justifyContent='center'
							alignItems='center'
							gap={2}
							m={0}
							px={4}
							bgColor='brand.blue'
							fontSize='2xs'
						>
							<Text>Development Branch:</Text>
							<chakra.code>{__APP_VERSION__}</chakra.code>
						</Flex>
					</DevMode>
				</Box>
			</SearchContextProvider>
		</>
	);
}

/**
 * Copyright (c) 2024 Maestra Music and Roundhouse Designs. All rights reserved.
 */

import { useEffect, useRef, useState } from 'react';
import { Box, Spacer, Stack, useDisclosure } from '@chakra-ui/react';
import { SearchContextProvider } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import Header from '@layout/Header';
import Main from '@layout/Main';
import Footer from '@layout/Footer';
import UserWayScript from '@components/UserWayScript';

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
		<SearchContextProvider>
			<Box
				minH={'-webkit-fill-available'}
				_dark={{
					bg: 'gray.900',
					color: 'text.light',
				}}
				_light={{
					bg: 'gray.50',
					color: 'text.dark',
				}}
			>
				<SearchDrawerContext.Provider value={{ drawerIsOpen, openDrawer, closeDrawer }}>
					<Stack h={'100vh'} w={'full'} overflow={'auto'} justifyContent={'space-between'} gap={0}>
						<Header ref={headerRef} />
						<Box h={'auto'} w={'full'} paddingTop={`${headerHeight}px`}>
							<Main />
						</Box>
						<Spacer />
						<Footer />
					</Stack>
				</SearchDrawerContext.Provider>
				<UserWayScript />
			</Box>
		</SearchContextProvider>
	);
}

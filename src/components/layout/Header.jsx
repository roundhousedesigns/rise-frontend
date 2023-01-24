import React, { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	Flex,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Spacer,
	Container,
	Link,
	Drawer,
	Stack,
	useDisclosure,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	useMediaQuery,
	Heading,
} from '@chakra-ui/react';
import { FiUser, FiX, FiSearch } from 'react-icons/fi';

import logo from '@/assets/gtw-logo-horizontal.svg';
import Search from '@/views/Search';

export default function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Box id="header" w="full" bg="black" py={3} align="center">
				<Container centerContent={true} w="full" maxWidth="9xl">
					<Flex w="100%" justify="center" align="center" flexWrap={true}>
						<Stack
							direction="row"
							align="left"
							alignItems="center"
							fontSize="lg"
							color="white"
							gap={2}
						>
							<IconButton
								ref={btnRef}
								icon={<FiSearch />}
								aria-label="Menu"
								variant="invisible"
								color="white"
								align="center"
								fontSize="1.4em"
								onClick={onOpen}
							/>
							<Link to="/" as={RouterLink} fontWeight="bold">
								Dashboard
							</Link>
						</Stack>
						<Spacer flex={{ base: 0, md: 1 }} />
						<Image
							src={logo}
							alt="Get To Work logo"
							loading="eager"
							w="auto"
							maxH="40px"
							flexShrink={1}
							mr={2}
						/>
						<Menu>
							{({ isOpen }) => (
								<>
									<MenuButton
										as={IconButton}
										icon={<FiUser /> /* TODO implement Avatar when logged in */}
										variant="round"
										isActive={isOpen}
										color={isOpen ? 'black' : 'white'}
										bg={isOpen ? 'white' : 'black'}
										borderColor="white"
										_hover={
											isOpen
												? {}
												: {
														bg: 'whiteAlpha.300',
												  }
										}
									></MenuButton>
									<MenuList>
										<MenuItem as={RouterLink} to="/profile">
											Crew Profile
										</MenuItem>
										<MenuItem as={RouterLink} to="/settings">
											Settings
										</MenuItem>
										<MenuDivider />
										<MenuItem>Logout</MenuItem>
									</MenuList>
								</>
							)}
						</Menu>
					</Flex>
				</Container>
			</Box>
			<Drawer isOpen={isOpen} onClose={onClose} placement="left" size="full">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader
						borderBottomWidth="1px"
						fontSize="2xl"
						py={6}
						bg="blackAlpha.800"
						color="whiteAlpha.900"
						borderBottom="2px solid pink"
					>
						<Stack direction="row" justifyContent="space-between">
							<Heading size="lg" color="white">
								Find Crew
							</Heading>
							<IconButton
								ref={btnRef}
								icon={<FiX />}
								color="white"
								aria-label="Close"
								fontSize="1.4em"
								onClick={onClose}
								variant="invisible"
							/>
						</Stack>
					</DrawerHeader>
					<DrawerBody py={8}>
						<Search />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

import React, { useRef } from 'react';
import {
	Box,
	Flex,
	IconButton,
	Image,
	Menu,
	MenuButton,
	Spacer,
	Container,
	Drawer,
	Stack,
	useDisclosure,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Heading,
	Text,
	useMediaQuery,
	LightMode,
} from '@chakra-ui/react';
import { FiUser, FiX, FiSearch } from 'react-icons/fi';

import Search from '@/views/Search';
import MainMenu from '../MainMenu';
import logo from '@/assets/gtw-logo-horizontal.svg';

export default function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const isLargerThan768 = useMediaQuery('(min-width: 768px)');

	return (
		<>
			<LightMode>
				<Box
					id="header"
					w="full"
					bg="black"
					py={3}
					align="center"
					color="white"
				>
					<Container centerContent={true} w="full" maxWidth="9xl">
						<Flex
							w="100%"
							justifyContent={{ base: 'space-between', sm: 'center' }}
							align="center"
							flexWrap={true}
						>
							<Stack
								direction="row"
								align="left"
								alignItems="center"
								fontSize="lg"
								gap={2}
							>
								<IconButton
									ref={btnRef}
									icon={<FiSearch />}
									aria-label="Search for candidates"
									variant="invisible"
									align="center"
									fontSize="1.4em"
									onClick={onOpen}
								/>
								{isLargerThan768 && (
									<Text
										size="md"
										marginInlineStart="-0.25em !important"
										color="white"
									>
										Find Crew
									</Text>
								)}
							</Stack>
							<Spacer />
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
											icon={
												<FiUser /> /* TODO implement Avatar when logged in */
											}
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
										/>
										<MainMenu />
									</>
								)}
							</Menu>
						</Flex>
					</Container>
				</Box>
			</LightMode>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				placement="left"
				size={{ base: 'full', md: 'xl' }}
			>
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

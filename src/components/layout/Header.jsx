import React, { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	Flex,
	IconButton,
	Image,
	Menu,
	MenuButton,
	Container,
	useDisclosure,
	LightMode,
	Spacer,
	Link,
	Stack,
} from '@chakra-ui/react';
import { FiUser, FiMoreHorizontal } from 'react-icons/fi';

import MainMenu from '../MainMenu';
import SearchDrawer from '../SearchDrawer';
import logo from '../../assets/gtw-logo-horizontal.svg';

export default function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

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
							justifyContent="space-between"
							align="center"
							flexWrap={true}
						>
							<IconButton
								ref={btnRef}
								icon={<FiMoreHorizontal />}
								aria-label="Search for candidates"
								variant="invisible"
								fontSize="3xl"
								onClick={onOpen}
							/>
							<Image
								src={logo}
								alt="Get To Work logo"
								loading="eager"
								w="auto"
								maxH="40px"
								flexShrink={1}
								mr={2}
							/>
							<Spacer />
							<Stack
								direction="row"
								spacing={4}
								mr={6}
								align="center"
								fontSize="lg"
								textTransform="uppercase"
							>
								<Link as={RouterLink} to="/search">
									Search
								</Link>
								<Link as={RouterLink} to="/profile">
									My Profile
								</Link>
							</Stack>
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
			<SearchDrawer isOpen={isOpen} onClose={onClose} />
		</>
	);
}

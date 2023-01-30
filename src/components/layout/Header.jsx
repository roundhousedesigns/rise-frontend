import React from 'react';
import React, { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	IconButton,
	Image,
	Container,
	useDisclosure,
	LightMode,
	Spacer,
	Link,
	Stack,
	useMediaQuery,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiUser } from 'react-icons/fi';

import Drawer from './SearchDrawer';
import logo from '../../assets/images/gtw-logo-horizontal.svg';

export default function Header() {
	const {
		isOpen: drawerIsOpen,
		onOpen: drawerOnOpen,
		onClose: drawerOnClose,
	} = useDisclosure();
	const btnRef = useRef();
	const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

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
					<Container centerContent w="full" maxWidth="9xl">
						<Stack
							direction="row"
							w="100%"
							justifyContent="space-between"
							align="center"
							flexWrap
						>
							<IconButton
								ref={btnRef}
								icon={<FiMoreHorizontal />}
								aria-label="Search for candidates"
								variant="invisible"
								fontSize="3xl"
								onClick={drawerOnOpen}
							/>
							<Link as={RouterLink} to="/">
								<Image
									src={logo}
									alt="Get To Work logo"
									loading="eager"
									w="auto"
									h="40px"
								/>
							</Link>
							{isLargerThan768 ? (
								<>
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
								</>
							) : null}

							<Link as={RouterLink} to="/profile">
								<IconButton
									variant="round"
									borderColor="white"
									icon={<FiUser /> /* TODO implement Avatar when logged in */}
								/>
							</Link>
						</Stack>
					</Container>
				</Box>
			</LightMode>

			<Drawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
		</>
	);
}

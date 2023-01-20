import React from 'react';
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
	HStack,
	Link,
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

import NavMenuItem from '@/components/common/NavMenuItem';
import logo from '@/assets/gtw-logo-horizontal.svg';

export default function Header() {
	return (
		<Box id="header" w="full" bg="black" py={3} align="center">
			<Container centerContent={true} w="full" maxWidth="9xl">
				<Flex w="100%" justify="center" align="center" flexWrap={true}>
					<HStack>
						<NavMenuItem linkTo="/">Dashboard</NavMenuItem>
						<NavMenuItem linkTo="/search">Search</NavMenuItem>
						<NavMenuItem linkTo="/profile">Crew Profile</NavMenuItem>
					</HStack>
					<Spacer />
					<Image
						src={logo}
						alt="Get To Work logo"
						loading="eager"
						w="auto"
						h="60px"
						mr={2}
					/>
					<Menu>
						{({ isOpen }) => (
							<>
								<MenuButton
									as={IconButton}
									icon={<FiUser />}
									variant="circle"
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
									<MenuItem>
										<Link to="/settings" as={RouterLink}>
											Settings
										</Link>
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
	);

	// Left: Menu icon --> <Drawer />
	// Right: Profile icon --> <Profile />
}

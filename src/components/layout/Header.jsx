import React from 'react';
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
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

import NavMenuItem from '@/components/common/NavMenuItem';
import logo from '@/assets/gtw-logo-horizontal.svg';

export default function Header() {
	return (
		<Box id="header" w="full" bg="black" px={8} py={4} align="center">
			<Container centerContent={true} w="full" maxWidth={1600}>
				<Flex w="100%" justify="center" align="center" flexWrap={true}>
					<HStack>
						<NavMenuItem styles={{ color: 'whiteAlpha.900' }} linkTo="/">
							Dashboard
						</NavMenuItem>
						<NavMenuItem styles={{ color: 'whiteAlpha.900' }} linkTo="/search">
							Search
						</NavMenuItem>
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
									<MenuItem>Profile</MenuItem>
									<MenuItem>Settings</MenuItem>
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

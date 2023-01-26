import React from 'react';
import { Link } from 'react-router-dom';
import {
	Menu,
	MenuList,
	MenuItem,
	MenuDivider,
	MenuButton,
	IconButton,
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

export default function MainMenu() {
	return (
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
					/>
					<MenuList color="blackAlpha.800">
						<MenuItem as={Link} to="/">
							Dashboard
						</MenuItem>
						<MenuItem as={Link} to="/account">
							Account
						</MenuItem>
						<MenuItem as={Link} to="/settings">
							Settings
						</MenuItem>
						<MenuDivider />
						<MenuItem>Logout</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	);
}

import React from 'react';
import { Link } from 'react-router-dom';
import {
	MenuList,
	MenuItem,
	MenuDivider,
	useColorMode,
} from '@chakra-ui/react';

export default function MainMenu() {
	return (
		<MenuList color="blackAlpha.800">
			<MenuItem as={Link} to="/">
				Dashboard
			</MenuItem>
			<MenuItem as={Link} to="/profile">
				Crew Profile
			</MenuItem>
			<MenuItem as={Link} to="/settings">
				Settings
			</MenuItem>
			<MenuDivider />
			<MenuItem>Logout</MenuItem>
		</MenuList>
	);
}

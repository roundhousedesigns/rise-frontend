import React from 'react';
import { Header } from 'grommet';
import logo from '@/assets/gtw-logo-horizontal.svg';

export default function PageHeader() {
	return (
		<Header>
			<img
				src={logo}
				alt="Get To Work logo"
				style={{ width: '300px', height: 'auto', position: 'relative' }}
			/>
		</Header>
	);

	// Left: Menu icon --> <Drawer />
	// Right: Profile icon --> <Profile />
}

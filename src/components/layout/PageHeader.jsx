import React from 'react';
import { Header } from 'grommet';
import logo from '@/assets/gtw-logo-horizontal.svg';

export default function PageHeader() {
	return (
		<Header background={'background-back-inverted'} pad="xsmall" position="relative">
			<img
				src={logo}
				alt="Get To Work logo"
				style={{ width: 'auto', height: '60px', position: 'relative' }}
			/>
		</Header>
	);

	// Left: Menu icon --> <Drawer />
	// Right: Profile icon --> <Profile />
}

import React from 'react';
import { Box, Grid, Page } from 'grommet';
import PageHeader from '@/components/layout/PageHeader';

// import "./App.css";

import Dev from './Dev';

export default function App() {
	return (
		<Grid
			rows={['xxsmall', 'flex', 'small']}
			columns={['small', 'auto', 'small']}
			areas={[
				{ name: 'header', start: [0, 0], end: [2, 0] },
				{ name: 'main', start: [0, 1], end: [2, 1] },
				{ name: 'footer', start: [0, 2], end: [2, 2] },
			]}
			alignContent="stretch"
		>
			<Box gridArea="header" background={'black'}>
				<PageHeader />
			</Box>
			<Box gridArea="main">hi!</Box>
			<Box gridArea="footer"></Box>
		</Grid>
	);

	// Main

	// Footer

	// Dev only.
	return <Dev />;
}

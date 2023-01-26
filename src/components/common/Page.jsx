import React from 'react';
import { Heading } from '@chakra-ui/react';

export default function Page({ children, title }) {
	return (
		<>
			{title ? (
				<Heading variant="pageTitle" as="h1">
					{title}
				</Heading>
			) : null}
			{children}
		</>
	);
}

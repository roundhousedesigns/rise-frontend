import React from 'react';
import { Heading, Box, Flex } from '@chakra-ui/react';

interface Props {
	title?: string;
	actions?: React.ReactNode;
	children: React.ReactNode;
}

export default function Page({ title, actions, children }: Props) {
	return (
		<Box mt={3}>
			<Flex justifyContent='space-between'>
				{title ? (
					<Heading variant='pageTitle' as='h1'>
						{title}
					</Heading>
				) : null}

				{actions ? actions : null}
			</Flex>

			{children}
		</Box>
	);
}

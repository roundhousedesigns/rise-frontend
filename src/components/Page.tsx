import React from 'react';
import { Heading, Box, Flex, Spacer } from '@chakra-ui/react';

interface Props {
	title?: string;
	actions?: React.ReactNode;
	children: React.ReactNode;
}

export default function Page({ title, actions, children }: Props) {
	return (
		<Box mt={3}>
			<Flex justifyContent='space-between' gap={2}>
				{title ? (
					<Heading variant='pageTitle' as='h1'>
						{title}
					</Heading>
				) : null}

				{actions ? (
					<>
						<Spacer />
						{actions}{' '}
					</>
				) : null}
			</Flex>

			{children}
		</Box>
	);
}

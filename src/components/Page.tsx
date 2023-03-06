import React from 'react';
import { Wrap, Heading } from '@chakra-ui/react';

interface Props {
	title?: string;
	actions?: React.ReactNode;
	children: React.ReactNode;
}

export default function Page({ title, actions, children }: Props) {
	return (
		<>
			<Wrap mb='8'>
				{title ? (
					<Heading variant='pageTitle' as='h1'>
						{title}
					</Heading>
				) : null}

				{actions ? actions : null}
			</Wrap>

			{children}
		</>
	);
}

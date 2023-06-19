import { ReactNode } from 'react';
import { Heading, Box, Flex } from '@chakra-ui/react';

interface Props {
	title?: string;
	actions?: ReactNode;
	children: ReactNode;
	[prop: string]: any;
}

export default function Page({ title, actions, children, ...props }: Props) {
	return (
		<Box mt={3} {...props}>
			<Flex justifyContent='space-between' alignItems='flex-end' gap={2} flexWrap='wrap'>
				{title ? (
					<Heading variant='pageTitle' as='h1' my={0} lineHeight='normal'>
						{title}
					</Heading>
				) : null}

				<Flex flexWrap='wrap' gap={2} justifyContent='flex-end'>
					{actions ? actions : null}
				</Flex>
			</Flex>

			{children}
		</Box>
	);
}

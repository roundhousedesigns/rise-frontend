import { ReactNode } from 'react';
import { Box, Card, Heading } from '@chakra-ui/react';

interface Props {
	title?: string;
	children: ReactNode;
	[prop: string]: any;
}

export default function SettingsSection({ title, children, ...props }: Props): JSX.Element {
	return (
		<Box mt={2} mx={0} flex={{ base: '0 0 100%', md: '0 0 48%' }} {...props}>
			{title ? (
				<Heading as='h3' variant='pageSubtitle' fontSize='2xl'>
					{title}
				</Heading>
			) : (
				false
			)}
			<Card my={4} pl={4}>
				{children}
			</Card>
		</Box>
	);
}

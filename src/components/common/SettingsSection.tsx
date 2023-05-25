import { Box, Card, Heading } from '@chakra-ui/react';

interface Props {
	title?: string;
	children: React.ReactNode;
	[prop: string]: any;
}

export default function SettingsSection({ title, children, ...props }: Props): JSX.Element {
	return (
		<Box mt={4} flex='1' {...props}>
			{title ? (
				<Heading variant='pageSubtitle' fontSize='2xl'>
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

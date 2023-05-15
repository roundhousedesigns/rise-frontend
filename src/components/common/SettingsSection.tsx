import { Box, Heading } from '@chakra-ui/react';

interface Props {
	title?: string;
	children: React.ReactNode;
}

export default function SettingsSection({ title, children }: Props): JSX.Element {
	return (
		<Box mt={4}>
			{title ? <Heading variant='contentTitle'>{title}</Heading> : false}
			<Box my={4}>{children}</Box>
		</Box>
	);
}

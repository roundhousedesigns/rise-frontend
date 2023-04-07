import { Box } from '@chakra-ui/react';

interface Props {
	[prop: string]: any;
}

export default function PreviewBox({ children, ...props }: Props) {
	return (
		<Box bg='gray.300' p={4} borderRadius='md' {...props}>
			{children}
		</Box>
	);
}

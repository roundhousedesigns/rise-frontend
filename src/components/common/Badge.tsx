import { Box } from '@chakra-ui/react';

interface Props {
	bg?: string;
	color?: string;
	children: React.ReactNode;
}

export default function Badge({ bg, color, children }: Props) {
	return (
		<Box borderRadius='full' bg={bg} color={color} px={4} py={2} fontSize='xs' fontWeight='bold'>
			{children}
		</Box>
	);
}

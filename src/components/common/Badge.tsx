import { Box } from '@chakra-ui/react';

interface Props {
	bg?: string;
	color?: string;
	children: React.ReactNode;
}

export default function Badge({ bg, color, children }: Props) {
	return (
		<Box
			borderRadius='full'
			bg={bg}
			color={color}
			px={2}
			py={1}
			fontSize='xs'
			fontWeight='bold'
			position='absolute'
			top='6px'
			left='8px'
			pointerEvents='none'
		>
			{children}
		</Box>
	);
}

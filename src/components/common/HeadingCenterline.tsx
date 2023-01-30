import { Box, Flex, Heading } from '@chakra-ui/react';

interface Props {
	lineColor: string;
	children: React.ReactNode;
}

export default function HeadingCenterline({ lineColor, children }: Props) {
	return (
		<Flex
			alignItems="center"
			w="full"
			h="max-content"
			pos="relative"
			textAlign="left"
		>
			<Box
				height="5px"
				bgColor={lineColor}
				pos="absolute"
				w="full"
				zIndex="1"
			></Box>
			<Heading
				size="lg"
				bg="white"
				_dark={{
					bg: 'gray.800',
					color: 'whiteAlpha.900',
				}}
				display="inline"
				lineHeight="none"
				zIndex="2"
				pr={2}
				textTransform="uppercase"
			>
				{children}
			</Heading>
		</Flex>
	);
}

import { As, Box, Flex, Heading } from '@chakra-ui/react';

interface Props {
	lineColor: string;
	children: React.ReactNode;
	headingAs?: As;
	[prop: string]: any;
}

export default function HeadingCenterline({ lineColor, children, headingAs, ...rest }: Props) {
	return (
		<Flex
			alignItems='center'
			w='full'
			h='max-content'
			pos='relative'
			textAlign='left'
			mb={4}
			{...rest}
		>
			<Box h='6px' top='38%' bgColor={lineColor} pos='absolute' w='full' zIndex='1'></Box>
			<Heading as={headingAs ? headingAs : 'h3'} variant='centerline'>
				{children}
			</Heading>
		</Flex>
	);
}

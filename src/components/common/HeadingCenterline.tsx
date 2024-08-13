import { ReactNode } from 'react';
import { As, Box, Flex, Heading } from '@chakra-ui/react';

interface Props {
	lineColor: string;
	children: ReactNode;
	headingAs?: As;
	headingProps?: { [prop: string]: any };
	[prop: string]: any;
}

export default function HeadingCenterline({
	lineColor,
	children,
	headingAs,
	headingProps,
	...props
}: Props) {
	return (
		<Flex alignItems={'center'} w={'full'} h={'max-content'} pos={'relative'} textAlign={'left'} {...props}>
			<Box h={'6px'} top={'38%'} bgColor={lineColor} pos={'absolute'} w={'full'} zIndex={'1'}></Box>
			<Heading as={headingAs ? headingAs : 'h3'} variant={'centerline'} {...headingProps}>
				{children}
			</Heading>
		</Flex>
	);
}

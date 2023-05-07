import { Box, Flex, Heading } from '@chakra-ui/react';

interface Props {
	lineColor: string;
	children: React.ReactNode;
	[prop: string]: any;
}

export default function HeadingCenterline({ lineColor, children, ...rest }: Props) {
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
			<Box h='6px' top='48%' bgColor={lineColor} pos='absolute' w='full' zIndex='1'></Box>
			<Heading
				size='xl'
				bg='text.light'
				_dark={{
					bg: 'gray.800',
					color: 'text.light',
				}}
				display='inline'
				lineHeight='none'
				zIndex='2'
				pr={2}
			>
				{children}
			</Heading>
		</Flex>
	);
}

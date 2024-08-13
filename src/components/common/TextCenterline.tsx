import { ReactNode } from 'react';
import { Box, Divider } from '@chakra-ui/react';

interface Props {
	children: ReactNode;
	[prop: string]: any;
}

export default function TextCenterline({ children, ...props }: Props) {
	return (
		<Box position={'relative'} py={2} {...props}>
			<Divider />
			<Box
				position={'absolute'}
				top={'50%'}
				transform={'translateY(-50%)'}
				left={12}
				_dark={{ bgColor: 'gray.900' }}
				_light={{ bgColor: 'gray.50' }}
				px={'2'}
			>
				{children}
			</Box>
		</Box>
	);
}

import { ReactNode } from 'react';
import { Flex, Icon } from '@chakra-ui/react';

interface Props {
	icon: any;
	iconProps?: any;
	children: ReactNode;
	[prop: string]: any;
}

export default function IconContent({ icon, iconProps, children, ...props }: Props): JSX.Element {
	return (
		<Flex my={2} alignItems='center' {...props}>
			{icon ? <Icon as={icon} mr={2} boxSize={4} {...iconProps} /> : null}
			{children}
		</Flex>
	);
}

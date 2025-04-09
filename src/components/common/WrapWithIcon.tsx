import { ReactNode } from 'react';
import { BoxProps, Flex, Icon } from '@chakra-ui/react';

interface Props {
	icon: any;
	iconProps?: any;
	children: ReactNode;
}

export default function WrapWithIcon({
	icon,
	iconProps,
	children,
	...props
}: Props & BoxProps): JSX.Element {
	return (
		<Flex my={2} alignItems='center' {...props}>
			{icon ? <Icon as={icon} mr={2} {...iconProps} /> : null}
			{children}
		</Flex>
	);
}

import { ReactNode } from 'react';
import { chakra, Icon } from '@chakra-ui/react';

interface Props {
	icon: any;
	iconProps?: any;
	children: ReactNode;
	[prop: string]: any;
}

export default function WrapWithIcon({ icon, iconProps, children, ...props }: Props): JSX.Element {
	return (
		<chakra.div display={'flex'} my={2} alignItems={'center'} {...props}>
			{icon ? <Icon as={icon} mr={1} {...iconProps} /> : null}
			{children}
		</chakra.div>
	);
}

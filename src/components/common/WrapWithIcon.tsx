import { ReactNode } from 'react';
import { chakra, Icon } from '@chakra-ui/react';

interface Props {
	icon: any;
	iconLabel?: string;
	iconProps?: any;
	children: ReactNode;
	[prop: string]: any;
}

export default function WrapWithIcon({
	icon,
	iconLabel,
	iconProps,
	children,
	...props
}: Props): JSX.Element {
	return (
		<chakra.div display={'flex'} my={2} alignItems={'center'} {...props}>
			{icon ? (
				<Icon as={icon} mr={1} aria-label={iconLabel ? iconLabel : ''} {...iconProps} />
			) : null}
			{children}
		</chakra.div>
	);
}

import { ReactNode } from 'react';
import { Icon, Flex, Link, Text } from '@chakra-ui/react';

interface Props {
	href?: string;
	onClick?: React.MouseEventHandler;
	icon: any;
	iconSide?: 'left' | 'right';
	isExternal?: boolean;
	children: ReactNode;
	iconProps?: {
		[prop: string]: any;
	};
	[prop: string]: any;
}

export default function LinkWithIcon({
	href,
	onClick,
	iconSide = 'left',
	icon,
	iconSize = 'sm',
	isExternal,
	children,
	iconProps,
	...props
}: Props): JSX.Element {
	return (
		<Link
			href={href ? href : undefined}
			onClick={onClick ? onClick : undefined}
			variant='dotted'
			fontWeight='medium'
			isExternal={!!isExternal}
			{...props}
		>
			<Flex alignItems='center' flexDirection={iconSide === 'left' ? 'row' : 'row-reverse'} gap={2}>
				<Icon as={icon} pos='relative' {...iconProps} />
				<Text m={0}>{children}</Text>
			</Flex>
		</Link>
	);
}

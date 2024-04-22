import { ReactNode } from 'react';
import { Icon as ChakraIcon, Link } from '@chakra-ui/react';

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
	const Icon = () => <ChakraIcon as={icon} mr={2} pos='relative' top='3px' {...iconProps} />;

	return (
		<Link
			href={href ? href : undefined}
			onClick={onClick ? onClick : undefined}
			variant='dotted'
			fontWeight='medium'
			isExternal={!!isExternal}
			{...props}
		>
			{iconSide === 'left' ? <Icon /> : false}
			{children}
			{iconSide === 'right' ? <Icon /> : false}
		</Link>
	);
}

import React from 'react';
import { Icon, Link } from '@chakra-ui/react';

interface Props {
	href: string;
	icon: any;
	target?: string;
	isExternal?: boolean;
	children: React.ReactNode;
}

export default function LinkWithIcon({
	href,
	icon,
	isExternal,
	children,
	...props
}: Props): JSX.Element {
	return (
		<Link href={href} variant='dotted' fontWeight='medium' isExternal={!!isExternal} {...props}>
			<Icon as={icon} mr={2} pos='relative' top='3px' />
			{children}
		</Link>
	);
}

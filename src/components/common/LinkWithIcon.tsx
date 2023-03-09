import { Icon, Link } from '@chakra-ui/react';

interface Props {
	href: string;
	icon: any;
	isExternal?: boolean;
	children: React.ReactNode;
}

export default function LinkWithIcon({
	href,
	icon,
	isExternal,
	children,
	...rest
}: Props): JSX.Element {
	return (
		<Link
			href={href}
			variant='dotted'
			fontWeight='medium'
			display='flex'
			alignItems='center'
			isExternal={!!isExternal}
			{...rest}
		>
			<Icon as={icon} mr={2} />
			{children}
		</Link>
	);
}

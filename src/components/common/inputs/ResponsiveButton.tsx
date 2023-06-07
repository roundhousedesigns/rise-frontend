import { ReactElement, JSXElementConstructor } from 'react';
import { Button, IconButton, useMediaQuery } from '@chakra-ui/react';

interface Props {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	children: React.ReactNode;
	[prop: string]: any;
}

export default function ResonsiveButton({ label, icon, children, ...props }: Props) {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

	return isLargerThanMd ? (
		<Button aria-label={label} leftIcon={icon} {...props}>
			{children}
		</Button>
	) : (
		<IconButton aria-label={label} icon={icon} {...props} />
	);
}

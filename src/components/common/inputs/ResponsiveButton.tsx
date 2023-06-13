import { ReactNode, ReactElement, JSXElementConstructor } from 'react';
import { Button, ButtonProps, IconButton, forwardRef, useMediaQuery } from '@chakra-ui/react';

interface Props extends ButtonProps {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	children: ReactNode;
	[prop: string]: any;
}

const ResponsiveButton = forwardRef<Props, 'div'>((props, ref) => {
	const { label, icon, children, ...rest } = props;

	const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

	return isLargerThanMd ? (
		<Button aria-label={label} leftIcon={icon} {...rest}>
			{children}
		</Button>
	) : (
		<IconButton aria-label={label} icon={icon} {...rest} />
	);
});

export default ResponsiveButton;

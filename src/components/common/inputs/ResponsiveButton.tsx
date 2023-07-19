import { ReactNode, ReactElement, JSXElementConstructor } from 'react';
import { Button, ButtonProps, IconButton, forwardRef, useBreakpointValue } from '@chakra-ui/react';

interface Props extends ButtonProps {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	children: ReactNode;
	[prop: string]: any;
}

const ResponsiveButton = forwardRef<Props, 'div'>((props, ref) => {
	const { label, icon, loading, children, ...rest } = props;

	const isFullSize = useBreakpointValue(
		{
			base: false,
			md: true,
		},
		{ ssr: false }
	);

	return isFullSize ? (
		<Button aria-label={label} leftIcon={icon} {...rest}>
			{children}
		</Button>
	) : (
		<IconButton aria-label={label} icon={icon} {...rest} />
	);
});

export default ResponsiveButton;

import { ReactNode, ReactElement, JSXElementConstructor } from 'react';
import { Button, ButtonProps, IconButton, forwardRef, useBreakpointValue } from '@chakra-ui/react';

interface Props extends ButtonProps {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	variant?: string;
	children: ReactNode;
	[prop: string]: any;
}

const ResponsiveButton = forwardRef<Props, 'div'>(
	({ label, icon, variant, children, ...rest }, ref) => {
		const isFullSize = useBreakpointValue(
			{
				base: false,
				md: true,
			},
			{ ssr: false }
		);

		return isFullSize ? (
			<Button aria-label={label} variant={variant} title={label} leftIcon={icon} {...rest}>
				{children}
			</Button>
		) : (
			<IconButton aria-label={label} variant={variant} title={label} icon={icon} {...rest} />
		);
	}
);

export default ResponsiveButton;

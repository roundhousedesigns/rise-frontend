/**
 * @deprecated v1.1.9
 */
import { ReactNode, ReactElement, JSXElementConstructor } from 'react';
import { Button, ButtonProps, IconButton, forwardRef, useBreakpointValue } from '@chakra-ui/react';

interface Props extends ButtonProps {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	variant?: string;
	children: ReactNode;
}

const ResponsiveButton = forwardRef<Props, 'div'>(
	({ label, icon, variant, children, ...props }, ref) => {
		const isFullSize = useBreakpointValue(
			{
				base: false,
				md: true,
			},
			{ ssr: true }
		);

		return isFullSize ? (
			<Button
				aria-label={label}
				variant={variant}
				title={label}
				leftIcon={icon}
				ref={ref}
				{...props}
			>
				{children}
			</Button>
		) : (
			<IconButton aria-label={label} variant={variant} title={label} icon={icon} {...props} />
		);
	}
);

export default ResponsiveButton;

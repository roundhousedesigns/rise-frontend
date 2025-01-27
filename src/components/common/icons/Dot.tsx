import { Icon, IconProps } from '@chakra-ui/react';

interface Props {
	pathProps?: {
		[prop: string]: any;
	};
}

export function Dot({ pathProps, ...props }: Props & IconProps) {
	return (
		<Icon aria-label={'dot icon'} viewBox={'0 0 200 200'} m={1} {...props}>
			<path
				strokeWidth={5}
				fill={'currentColor'}
				d={'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'}
				{...pathProps}
			/>
		</Icon>
	);
}

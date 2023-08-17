import { ReactNode } from 'react';
import { Icon, Text, Wrap } from '@chakra-ui/react';

interface Props {
	icon: any;
	iconProps?: any;
	children: ReactNode;
	[prop: string]: any;
}

export default function WrapWithIcon({ icon, iconProps, children, ...props }: Props): JSX.Element {
	return (
		<Wrap display='flex' my={2} alignItems='center' {...props}>
			{icon ? <Icon as={icon} mr={2} boxSize={4} {...iconProps} /> : null}
			<Text as='span' m={0}>
				{children}
			</Text>
		</Wrap>
	);
}

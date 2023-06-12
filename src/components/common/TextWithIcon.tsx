import { ReactNode } from 'react';
import { Icon, Text } from '@chakra-ui/react';

interface Props {
	icon: any;
	children: ReactNode;
	[prop: string]: any;
}

export default function TextWithIcon({ icon, children, ...props }: Props): JSX.Element {
	return (
		<Text display='flex' alignItems='center' {...props}>
			{icon ? <Icon as={icon} mr={2} boxSize={4} /> : null}
			{children}
		</Text>
	);
}

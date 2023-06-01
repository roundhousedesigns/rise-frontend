import { Icon, Text } from '@chakra-ui/react';

interface Props {
	icon: any;
	children: React.ReactNode;
	[key: string]: any;
}

export default function TextWithIcon({ icon, children, ...rest }: Props): JSX.Element {
	return (
		<Text display='flex' alignItems='center' {...rest}>
			{icon ? <Icon as={icon} mr={2} boxSize={4} /> : null}
			{children}
		</Text>
	);
}

import { Icon } from '@chakra-ui/react';
import { FiTarget } from 'react-icons/fi';

interface Props {
	boxSize?: number;
	label?: string;
	[prop: string]: any;
}

export default function TargetIcon({
	boxSize = 4,
	label = 'visual separator',
	...props
}: Props) {
	return <Icon as={FiTarget} aria-label={label} boxSize={boxSize} {...props} />;
}

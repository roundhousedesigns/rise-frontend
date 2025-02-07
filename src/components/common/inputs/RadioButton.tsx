import { ReactElement, ReactNode } from 'react';
import { Radio, RadioProps } from '@chakra-ui/react';

interface Props {
	value?: string;
	children: ReactNode;
}

export default function RadioButton({
	value,
	children,
	...props
}: Props & RadioProps): ReactElement {
	return (
		<Radio value={value} variant='buttonStyle' position='relative' {...props}>
			{children}
		</Radio>
	);
}

import { ReactElement, ReactNode } from 'react';
import { Radio } from '@chakra-ui/react';

interface Props {
	value?: string;
	children: ReactNode;
	[prop: string]: any;
}

export default function RadioButton({ value, children, ...props }: Props): ReactElement {
	return (
		<Radio value={value} variant='buttonStyle' position='relative' {...props}>
			{children}
		</Radio>
	);
}

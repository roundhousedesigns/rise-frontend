import { ReactElement, ReactNode } from 'react';
import { Box, Checkbox } from '@chakra-ui/react';

interface Props {
	value?: string;
	children: ReactNode;
	[prop: string]: any;
}

export default function CheckboxButton({ value, children, ...props }: Props): ReactElement {
	return (
		<Checkbox value={value} variant={'buttonStyle'} position={'relative'} {...props}>
			<Box pl={1}>{children}</Box>
		</Checkbox>
	);
}

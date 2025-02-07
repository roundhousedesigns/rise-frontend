import { ReactElement, ReactNode } from 'react';
import { Box, Checkbox, CheckboxProps } from '@chakra-ui/react';

interface Props {
	value?: string;
	children: ReactNode;
}

export default function CheckboxButton({
	value,
	children,
	...props
}: Props & CheckboxProps): ReactElement {
	return (
		<Checkbox value={value} variant='buttonStyle' position='relative' {...props}>
			<Box pl={1}>{children}</Box>
		</Checkbox>
	);
}

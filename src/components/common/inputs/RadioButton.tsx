import { Radio } from '@chakra-ui/react';

interface Props {
	value?: string;
	children: React.ReactNode;
	[prop: string]: any;
}

export default function RadioButton({
	value,
	children,
	...props
}: Props): React.ReactElement {
	return (
		<Radio value={value} variant='buttonStyle' position='relative' {...props}>
			{children}
		</Radio>
	);
}

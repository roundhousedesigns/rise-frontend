import { Checkbox } from '@chakra-ui/react';

interface Props {
	value?: string;
	// isChecked?: boolean;
	children: React.ReactNode;
	[prop: string]: any;
}

export default function CheckboxButton({
	value,
	// isChecked,
	children,
	...props
}: Props): React.ReactElement {
	return (
		<Checkbox value={value} variant='buttonStyle' m={1} position='relative' {...props}>
			{children}
		</Checkbox>
	);
}

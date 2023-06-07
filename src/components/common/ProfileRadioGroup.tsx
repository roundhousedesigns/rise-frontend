import { Key } from 'react';
import { Box, FormLabel, RadioGroup, Wrap } from '@chakra-ui/react';
import RadioButton from './inputs/RadioButton';

interface Props {
	name: string;
	label?: string;
	items: {
		label: string;
		value: string;
	}[];
	defaultValue: string;
	handleChange: (name: string) => (value: string) => void;
	[prop: string]: any;
}

export default function ProfileRadioGroup({
	name,
	label,
	items,
	defaultValue,
	handleChange,
	...props
}: Props) {
	const handleToggleItem = (value: string) => {
		handleChange(name)(value);
	};

	return items ? (
		<Box {...props}>
			<RadioGroup value={defaultValue} onChange={handleToggleItem}>
				<Wrap spacing={0}>
					{items.map((item: { label: string; value: string }, index: Key) => {
						return (
							<RadioButton key={index} value={item.value} m={0}>
								{item.label}
							</RadioButton>
						);
					})}
				</Wrap>
			</RadioGroup>
			{label ? <FormLabel fontSize='sm'>{label}</FormLabel> : false}
		</Box>
	) : null;
}

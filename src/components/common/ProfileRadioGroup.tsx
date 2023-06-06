import { Key } from 'react';
import { FormLabel, RadioGroup, Wrap } from '@chakra-ui/react';
import RadioButton from './RadioButton';

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
		<>
			<RadioGroup value={defaultValue} onChange={handleToggleItem} {...props}>
				<Wrap>
					{items.map((item: { label: string; value: string }, index: Key) => {
						return (
							<RadioButton key={index} value={item.value}>
								{item.label}
							</RadioButton>
						);
					})}
				</Wrap>
			</RadioGroup>
			{label ? <FormLabel fontSize='sm'>{label}</FormLabel> : false}
		</>
	) : null;
}

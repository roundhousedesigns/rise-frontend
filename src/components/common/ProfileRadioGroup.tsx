import { useEffect } from 'react';
import { Wrap, useRadioGroup } from '@chakra-ui/react';
import RadioButton from './RadioButton';

interface Props {
	name: string;
	items: {
		label: string;
		value: string;
	}[];
	defaultValue: string;
	handleChange: (name: string) => (value: string) => void;
	[key: string]: any;
}

export default function ProfileRadioGroup({
	name,
	items,
	defaultValue,
	handleChange,
	...rest
}: Props) {
	const handleToggleItem = (value: string) => {
		handleChange(name)(value);
	};

	const { setValue, getRootProps, getRadioProps } = useRadioGroup({
		defaultValue: '1',
		onChange: handleToggleItem,
	});

	// Set the RadioGroup value on initial render
	useEffect(() => {
		setValue(defaultValue);
	}, []);

	return items ? (
		<Wrap justifyContent='flex-start' alignItems='center' w='full' {...getRootProps()} {...rest}>
			{items.map((item: { label: string; value: string }) => {
				return (
					<RadioButton key={item.value} {...getRadioProps({ value: item.value })}>
						{item.label}
					</RadioButton>
				);
			})}
		</Wrap>
	) : null;
}

import { Key, useEffect } from 'react';
import { Flex, FormControl, FormLabel, useRadioGroup } from '@chakra-ui/react';
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

	const { setValue, getRootProps, getRadioProps } = useRadioGroup({
		defaultValue,
		onChange: handleToggleItem,
	});

	// Subscribe to the state to update the UI
	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return items ? (
		<FormControl>
			<Flex
				justifyContent='flex-start'
				alignItems='center'
				w='full'
				py={2}
				gap={2}
				fontSize='sm'
				{...getRootProps()}
				{...props}
			>
				{items.map((item: { label: string; value: string }, index: Key) => {
					return (
						<RadioButton key={index} {...getRadioProps({ value: item.value })}>
							{item.label}
						</RadioButton>
					);
				})}
			</Flex>
			{label ? <FormLabel fontSize='sm'>{label}</FormLabel> : false}
		</FormControl>
	) : null;
}

import { Key, useEffect } from 'react';
import { Flex, useRadioGroup } from '@chakra-ui/react';
import RadioButton from './RadioButton';

interface Props {
	name: string;
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

	// Set the RadioGroup value on initial render
	useEffect(() => {
		setValue(defaultValue);
	}, []);

	return items ? (
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
	) : null;
}

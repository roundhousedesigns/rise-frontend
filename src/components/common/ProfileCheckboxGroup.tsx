import { useEffect } from 'react';
import { Wrap, useCheckboxGroup } from '@chakra-ui/react';
import { WPItem } from '../../lib/classes';
import CheckboxButton from './CheckboxButton';

interface Props {
	name: string;
	items: WPItem[];
	checked: string[];
	handleChange: (name: string) => (value: string[]) => void;
}

export default function ProfileCheckboxGroup({
	name,
	items,
	checked,
	handleChange,
	...rest
}: Props) {
	const handleToggleItem = (items: string[]) => {
		handleChange(name)(items);
	};

	const { setValue, getCheckboxProps } = useCheckboxGroup({
		defaultValue: [],
		onChange: handleToggleItem,
	});

	// Set the CheckboxGroup value on initial render
	useEffect(() => {
		setValue(checked);
	}, []);

	return items ? (
		<Wrap justifyContent='flex-start' alignItems='center' w='full' py={2} {...rest}>
			{items.map((item: WPItem) => {
				const checkbox = getCheckboxProps({ value: item.id.toString() });

				return (
					<CheckboxButton key={item.id} {...checkbox}>
						{item.name}
					</CheckboxButton>
				);
			})}
		</Wrap>
	) : null;
}

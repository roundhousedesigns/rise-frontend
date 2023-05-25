import { Key, useEffect } from 'react';
import { Wrap, useCheckboxGroup } from '@chakra-ui/react';
import { WPItem } from '../../lib/classes';
import CheckboxButton from './CheckboxButton';

interface Props {
	name: string;
	items: WPItem[];
	checked: string[];
	isRequired?: boolean;
	handleChange: (name: string) => (value: string[]) => void;
	[prop: string]: any;
}

export default function ProfileCheckboxGroup({
	name,
	items,
	checked,
	isRequired,
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

	// Subscribe to the state to update the UI
	useEffect(() => {
		setValue(checked);
	}, [checked]);

	return items ? (
		<Wrap justifyContent='flex-start' alignItems='center' w='full' py={2} {...rest}>
			{items.map((item: WPItem, index: Key) => {
				return (
					<CheckboxButton
						key={index}
						{...getCheckboxProps({ value: item.id.toString() })}
						tabIndex='9'
					>
						{item.name}
					</CheckboxButton>
				);
			})}
		</Wrap>
	) : null;
}

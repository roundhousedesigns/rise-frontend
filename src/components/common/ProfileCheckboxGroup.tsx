import { useEffect } from 'react';
import { Wrap, Box, useCheckboxGroup } from '@chakra-ui/react';
import { WPItem } from '../../lib/classes';
import CheckboxButton from './CheckboxButton';

interface Props {
	filter: string;
	items: WPItem[];
	checked: string[];
}

export default function ProfileCheckboxGroup({ filter, items, checked }: Props) {
	const handleToggleItem = (items: string[]) => {};

	const { getCheckboxProps, setValue } = useCheckboxGroup({
		defaultValue: [],
		onChange: handleToggleItem,
	});

	// Set the CheckboxGroup value on initial render
	useEffect(() => {
		setValue(checked);
	}, []);

	return items ? (
		<Box>
			<Wrap justifyContent='flex-start' alignItems='center' w='full'>
				{items.map((item: WPItem) => {
					const checkbox = getCheckboxProps({ value: item.id.toString() });

					return (
						<CheckboxButton key={item.id} {...checkbox}>
							{item.name}
						</CheckboxButton>
					);
				})}
			</Wrap>
		</Box>
	) : null;
}

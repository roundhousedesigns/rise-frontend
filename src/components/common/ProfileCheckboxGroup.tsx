import { Key } from 'react';
import { CheckboxGroup, Text, Wrap } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import CheckboxButton from '@common/inputs/CheckboxButton';

interface Props {
	name: string;
	items: WPItem[];
	checked: string[];
	isRequired?: boolean;
	requiredMessage?: string;
	handleChange: (name: string) => (value: string[]) => void;
	[prop: string]: any;
}

export default function ProfileCheckboxGroup({
	name,
	items,
	checked,
	isRequired,
	requiredMessage,
	handleChange,
	...props
}: Props) {
	const numberChecked = checked.length;

	return items ? (
		<CheckboxGroup value={checked} onChange={handleChange(name)} {...props}>
			{isRequired && requiredMessage && numberChecked < 1 ? (
				<Text color='red.500' fontSize='sm'>
					{requiredMessage}
				</Text>
			) : null}
			<Wrap spacing={2}>
				{items.map((item: WPItem, index: Key) => {
					return (
						<CheckboxButton key={index} value={item.id.toString()}>
							{item.name}
						</CheckboxButton>
					);
				})}
			</Wrap>
		</CheckboxGroup>
	) : null;
}

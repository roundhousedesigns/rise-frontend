import { Key } from 'react';
import { CheckboxGroup, Wrap } from '@chakra-ui/react';
import { WPItem } from '../../lib/classes';
import CheckboxButton from './inputs/CheckboxButton';

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
	return items ? (
		<CheckboxGroup defaultValue={checked} onChange={handleChange(name)} {...rest}>
			<Wrap>
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

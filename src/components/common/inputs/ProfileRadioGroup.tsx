import { chakra, FormLabel, RadioGroup, Wrap } from '@chakra-ui/react';
import RadioButton from '@common/inputs/RadioButton';

interface Props {
	name: string;
	label?: string;
	items: {
		label: string;
		value: string;
	}[];
	groupButtons?: boolean;
	defaultValue: string;
	handleChange: (value: string) => void;
	[prop: string]: any;
}

export default function ProfileRadioGroup({
	name,
	label,
	items,
	groupButtons,
	defaultValue,
	handleChange,
	...props
}: Props) {
	return items ? (
		<chakra.div {...props}>
			<RadioGroup defaultValue={defaultValue} onChange={handleChange}>
				<Wrap spacing={1}>
					{items.map((item) => (
						<RadioButton key={`${item.label}:${item.value}`} value={item.value}>
							{item.label}
						</RadioButton>
					))}
				</Wrap>
			</RadioGroup>
			{label && <FormLabel fontSize={'sm'}>{label}</FormLabel>}
		</chakra.div>
	) : null;
}

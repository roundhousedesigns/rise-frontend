import { BoxProps, chakra, FormLabel, RadioGroup, Wrap } from '@chakra-ui/react';
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
	handleChange: (name: string) => (value: string) => void;
}

export default function ProfileRadioGroup({
	name,
	label,
	items,
	groupButtons,
	defaultValue,
	handleChange,
	...props
}: Props & BoxProps): JSX.Element | null {
	const handleToggleItem = (value: string) => {
		handleChange(name)(value);
	};

	return items ? (
		<chakra.div {...props}>
			<RadioGroup value={defaultValue} onChange={handleToggleItem}>
				<Wrap spacing={1}>
					{items.map((item: { label: string; value: string }) => {
						return (
							<RadioButton key={`${item.label}:${item.value}`} value={item.value}>
								{item.label}
							</RadioButton>
						);
					})}
				</Wrap>
			</RadioGroup>
			{label ? <FormLabel fontSize='sm'>{label}</FormLabel> : false}
		</chakra.div>
	) : null;
}

import { useEffect, useState } from 'react';
import { FormControl, Switch, FormLabel, Icon, As, Text, Spinner } from '@chakra-ui/react';

interface Props {
	checked: boolean;
	id: string;
	colorScheme?: string;
	label: string;
	icon?: As;
	iconRight?: As;
	size?: string;
	loading?: boolean;
	callback: () => void;
	children?: string | JSX.Element;
	[prop: string]: any;
}
export default function ToggleOptionSwitch({
	checked,
	id,
	colorScheme = 'green',
	label,
	icon,
	iconRight,
	size = 'lg',
	loading,
	callback,
	children,
	...props
}: Props): JSX.Element {
	const [toggleState, setToggleState] = useState<boolean>(checked);

	// Sync the toggleState with the checked prop
	useEffect(() => {
		setToggleState(checked);
	}, [checked]);

	const handleChange = () => {
		setToggleState(!toggleState);
		callback();
	};

	const sizeProps = {
		fontSize: size,
		iconBoxSize: size === 'lg' ? 8 : 'md' ? 6 : 'sm' ? 4 : 8,
	};

	return (
		<FormControl display='flex' alignItems='center' {...props}>
			{icon ? (
				<Icon as={icon as As} boxSize={sizeProps.iconBoxSize} p={1} color='inherit' />
			) : (
				false
			)}
			<Switch
				id={id}
				onChange={handleChange}
				isChecked={toggleState}
				color='inherit'
				mx={1}
				colorScheme={colorScheme}
				aria-label={label}
			/>
			{iconRight ? <Icon as={iconRight as As} boxSize={sizeProps.iconBoxSize} p={1} /> : false}
			<FormLabel htmlFor={id} m={0} fontSize={sizeProps.fontSize}>
				<Text as='span' fontSize='md' fontStyle='italic' color='inherit' pl={2}>
					{children}
				</Text>
			</FormLabel>
			{loading && <Spinner />}
		</FormControl>
	);
}

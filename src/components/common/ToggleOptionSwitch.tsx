import { useEffect, useState } from 'react';
import { FormControl, Switch, FormLabel, Icon, As, Spinner } from '@chakra-ui/react';

interface Props {
	checked: boolean;
	id: string;
	colorScheme?: string;
	label: string;
	icon?: As;
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
		<FormControl display='flex' alignItems='center' py={1} {...props}>
			{icon ? (
				<Icon as={icon as As} mr={1} boxSize={sizeProps.iconBoxSize} p={1} color='inherit' />
			) : (
				false
			)}
			<Switch
				id={id}
				onChange={handleChange}
				isChecked={toggleState}
				color='inherit'
				mr={2}
				colorScheme={colorScheme}
				aria-label={label}
			/>
			<FormLabel htmlFor={id} m={0} fontSize={sizeProps.fontSize}>
				{children}
			</FormLabel>
			{loading && <Spinner />}
		</FormControl>
	);
}

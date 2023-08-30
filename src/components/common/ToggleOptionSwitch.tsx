import { useEffect, useState } from 'react';
import { FormControl, Switch, FormLabel, Icon, Text, As, Spinner } from '@chakra-ui/react';

interface Props {
	checked: boolean;
	id: string;
	colorScheme?: string;
	label: string;
	icon?: As;
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

	return (
		<FormControl display='flex' alignItems='center' py={1} {...props}>
			{icon ? <Icon as={icon as As} mr={1} boxSize={8} p={1} color='inherit' /> : false}
			<Switch
				id={id}
				onChange={handleChange}
				isChecked={toggleState}
				color='inherit'
				mr={4}
				ml={2}
				colorScheme={colorScheme}
				aria-label={label}
			/>
			<FormLabel htmlFor={id} m={0} fontSize='lg'>
				{label}
				{children ? (
					<Text as='span' fontSize='xs' pl={2} fontStyle='italic' color='inherit'>
						{children}
					</Text>
				) : (
					''
				)}
			</FormLabel>
			{loading && <Spinner />}
		</FormControl>
	);
}

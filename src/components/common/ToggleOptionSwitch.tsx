import { useEffect, useState } from 'react';
import { FormControl, Switch, FormLabel, Icon, Text, As, Spinner } from '@chakra-ui/react';

interface Props {
	checked: boolean;
	id: string;
	colorScheme?: string;
	label: string;
	subtext?: string;
	icon?: As;
	loading?: boolean;
	callback: () => void;
}
export default function ToggleOptionSwitch({
	checked,
	id,
	colorScheme = 'green',
	label,
	subtext,
	icon,
	loading,
	callback,
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
		<FormControl display='flex' alignItems='center' py={1}>
			{icon ? <Icon as={icon as As} mr={2} boxSize={6} /> : false}
			<Switch
				id={id}
				onChange={handleChange}
				isChecked={toggleState}
				mr={4}
				ml={2}
				colorScheme={colorScheme}
				aria-label={label}
			/>
			<FormLabel htmlFor={id} m={0} fontSize='lg'>
				{label}
				{subtext ? (
					<Text as='span' fontSize='sm' pl={2} fontStyle='italic'>
						{' '}
						{subtext}
					</Text>
				) : (
					''
				)}
			</FormLabel>
			{loading && <Spinner />}
		</FormControl>
	);
}

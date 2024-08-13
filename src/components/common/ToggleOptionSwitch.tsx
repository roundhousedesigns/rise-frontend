import { useEffect, useState } from 'react';
import { FormControl, Switch, FormLabel, Icon, As, FormHelperText, Box } from '@chakra-ui/react';

interface Props {
	checked: boolean;
	id: string;
	colorScheme?: string;
	label: string;
	showLabel?: boolean;
	iconLeft?: As;
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
	showLabel = true,
	iconLeft,
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
		<FormControl display={'flex'} alignItems={'center'} position={'relative'} {...props}>
			{iconLeft ? (
				<Icon as={iconLeft as As} boxSize={sizeProps.iconBoxSize} p={1} color={'inherit'} />
			) : (
				false
			)}
			<Switch
				id={id}
				onChange={handleChange}
				isChecked={toggleState}
				color={'inherit'}
				mx={1}
				colorScheme={colorScheme}
				aria-label={label}
				isDisabled={loading}
			/>
			{iconRight ? <Icon as={iconRight as As} boxSize={sizeProps.iconBoxSize} p={1} /> : false}
			<Box ml={4}>
				<FormLabel
					htmlFor={id}
					visibility={showLabel ? 'visible' : 'hidden'}
					my={0}
					fontWeight={'bold'}
				>
					{label}
				</FormLabel>
				{children ? (
					<FormHelperText my={0} fontStyle={'italic'}>
						{children}
					</FormHelperText>
				) : (
					false
				)}
			</Box>
		</FormControl>
	);
}

import {
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';

interface Props {
	name: string;
	label?: string;
	helperText?: string;
	placeholder?: string;
	value?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	leftElement?: React.ReactNode;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputProps?: {
		[prop: string]: any;
	};
	[prop: string]: any;
}

export default function TextInput({
	label,
	labelHidden,
	helperText,
	placeholder,
	value,
	name,
	isDisabled,
	isRequired,
	onChange,
	leftElement,
	leftAddon,
	inputProps,
	...props
}: Props) {
	return (
		// TODO implement character count ("xx/yy remaining")
		<FormControl isRequired={isRequired} {...props}>
			<InputGroup>
				{leftElement ? (
					<InputLeftElement pointerEvents='none'>{leftElement}</InputLeftElement>
				) : (
					false
				)}
				<Input
					variant='filled'
					focusBorderColor='blue.200'
					placeholder={placeholder}
					isDisabled={isDisabled}
					value={value}
					name={name}
					onChange={onChange}
					{...inputProps}
				/>
			</InputGroup>
			{label ? (
				<FormLabel
					ml={2}
					fontSize='sm'
					sx={{
						visibility: labelHidden ? 'hidden' : 'visible',
						position: labelHidden ? 'absolute' : 'initial',
					}}
				>
					{label}
				</FormLabel>
			) : (
				false
			)}
			{helperText ? <FormHelperText>{helperText}</FormHelperText> : false}
		</FormControl>
	);
}

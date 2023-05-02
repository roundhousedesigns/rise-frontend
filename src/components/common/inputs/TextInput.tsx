import {
	Flex,
	FormControl,
	FormErrorMessage,
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
	error?: string;
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
	error,
	onChange,
	leftElement,
	leftAddon,
	inputProps,
	...props
}: Props) {
	return (
		// TODO implement character count ("xx/yy remaining")
		<FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
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
			<Flex direction='row' pt={1} mb={2} alignItems='top' gap={4} justifyContent='space-between'>
				{label ? (
					<FormLabel
						ml={2}
						mr={0}
						my={0}
						lineHeight='normal'
						fontSize='sm'
						flexGrow='0'
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
				{helperText ? (
					<FormHelperText my={0} flex='1'>
						{helperText}
					</FormHelperText>
				) : (
					false
				)}
				{error ? (
					<FormErrorMessage fontWeight='bold' my={0}>
						{error}
					</FormErrorMessage>
				) : (
					false
				)}
			</Flex>
		</FormControl>
	);
}

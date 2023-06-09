import {
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
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
	maxLength?: number;
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
	maxLength,
	inputProps,
	...props
}: Props) {
	const HelperTextFormatted = () => {
		let text = helperText ? helperText : '';

		if (maxLength) {
			const length = value ? value.length : 0;
			text = `${text} (${length}/${maxLength})`;
		}

		console.info(text);

		return <Text as='span'>{text}</Text>;
	};

	return (
		<FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
			<InputGroup>
				{leftElement ? (
					<InputLeftElement pointerEvents='none' _dark={{ color: 'text.dark' }}>
						{leftElement}
					</InputLeftElement>
				) : (
					false
				)}
				<Input
					variant='filled'
					focusBorderColor='brand.blue'
					placeholder={placeholder}
					fontSize='md'
					isDisabled={isDisabled}
					value={value}
					name={name}
					onChange={onChange}
					_dark={{
						color: 'text.dark',
					}}
					maxLength={maxLength ? maxLength : undefined}
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
						fontSize='md'
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
				<FormHelperText my={0} flex='1'>
					<HelperTextFormatted />
				</FormHelperText>
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

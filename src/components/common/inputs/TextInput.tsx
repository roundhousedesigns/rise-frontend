import { ChangeEvent, ReactNode } from 'react';
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
	Wrap,
} from '@chakra-ui/react';

interface Props {
	name: string;
	label?: string | JSX.Element;
	helperText?: string;
	placeholder?: string;
	value?: string;
	variant?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	error?: string;
	leftElement?: ReactNode;
	maxLength?: number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
	variant,
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
	const inputVariant = variant ? variant : 'filled';

	const HelperTextFormatted = () => {
		let text = helperText ? helperText : '';
		let lengthText = '';

		if (maxLength) {
			const length = value ? value.length : 0;
			lengthText = `${length}/${maxLength}`;
		}

		return (
			<Flex
				w='full'
				justifyContent='space-between'
				alignItems='center'
				lineHeight='normal'
				fontSize='xs'
			>
				<Text m={0}>{text}</Text>
				<Text m={0} opacity={0.8} fontStyle='italic' lineHeight='normal' fontSize='2xs'>
					{lengthText}
				</Text>
			</Flex>
		);
	};

	return (
		<FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
			<InputGroup>
				{leftElement && (
					<InputLeftElement pointerEvents='none' _dark={{ color: 'text.dark' }}>
						{leftElement}
					</InputLeftElement>
				)}
				<Input
					variant={inputVariant}
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
						w='full'
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
				<Wrap w='full'>
					<FormHelperText my={0} flex='1' fontSize='xs' w='full'>
						<HelperTextFormatted />
					</FormHelperText>
					{error && (
						<FormErrorMessage fontWeight='bold' my={0}>
							{error}
						</FormErrorMessage>
					)}
				</Wrap>
			</Flex>
		</FormControl>
	);
}

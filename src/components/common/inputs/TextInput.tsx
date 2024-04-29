import { ChangeEvent, ForwardedRef, forwardRef, ReactNode } from 'react';
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
	labelHidden?: boolean;
	helperText?: string;
	placeholder?: string;
	value?: string;
	variant?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	error?: string;
	leftElement?: ReactNode;
	maxLength?: number;
	inputProps?: {
		[prop: string]: any;
	};
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	[prop: string]: any;
}

const TextInput = forwardRef(
	(
		{
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
			leftElement,
			maxLength,
			inputProps,
			onChange,
			...props
		}: Props,
		forwardedRef: ForwardedRef<HTMLInputElement>
	) => {
		const inputVariant = variant ? variant : 'filled';

		const HelperTextFormatted = () => {
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
					<Text m={0} variant='helperText'>
						{helperText}
					</Text>
					<Text m={0} variant='helperText'>
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
						px={3}
						value={value}
						name={name}
						ref={forwardedRef}
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
					<Wrap w='full' alignItems='flex-start'>
						{helperText ? (
							<FormHelperText my={0} flex='1' fontSize='xs' w='full'>
								<HelperTextFormatted />
							</FormHelperText>
						) : (
							false
						)}
						{error && (
							<FormErrorMessage fontWeight='bold' mt={0}>
								{error}
							</FormErrorMessage>
						)}
					</Wrap>
				</Flex>
			</FormControl>
		);
	}
);

export default TextInput;

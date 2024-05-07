import { ChangeEvent, ForwardedRef, forwardRef, ReactNode } from 'react';
import {
	Box,
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

function CharCount({ length, maxLength }: { length: number; maxLength: number }): JSX.Element {
	return (
		<Text m={0} variant='helperText' _dark={{ color: 'text.dark', opacity: 0.8 }}>
			{`${length}/${maxLength}`}
		</Text>
	);
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
				</Flex>
			);
		};

		return (
			<FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
				<InputGroup position='relative'>
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
					{maxLength ? (
						<Box position='absolute' right={2} top={2}>
							<CharCount length={value ? value.length : 0} maxLength={maxLength} />
						</Box>
					) : (
						false
					)}
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

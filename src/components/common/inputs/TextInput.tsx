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
	sizeToken?: string;
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
			sizeToken = 'md',
			inputProps,
			onChange,
			...props
		}: Props,
		forwardedRef: ForwardedRef<HTMLInputElement>
	) => {
		const inputVariant = variant ? variant : 'filled';

		/**
		 * Returns the box size based on the given size token.
		 */
		const boxSize = (): number | undefined => {
			switch (sizeToken) {
				case 'sm':
					return 8;
				case 'md':
					return 10;
				case 'lg':
					return 12;
			}

			return undefined;
		};

		return (
			<FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
				<InputGroup position='relative'>
					{leftElement && (
						<InputLeftElement
							pointerEvents='none'
							_dark={{ color: 'text.dark' }}
							boxSize={boxSize()}
						>
							{leftElement}
						</InputLeftElement>
					)}
					<Input
						variant={inputVariant}
						focusBorderColor='brand.blue'
						placeholder={placeholder}
						isDisabled={isDisabled}
						px={3}
						value={value}
						name={name}
						ref={forwardedRef}
						fontSize={sizeToken}
						size={sizeToken}
						onChange={onChange}
						_dark={{
							color: 'text.dark',
						}}
						maxLength={maxLength ? maxLength : undefined}
						{...inputProps}
					/>
					{maxLength ? (
						<Flex position='absolute' right={1} top={0} height='full' alignItems='flex-end'>
							<Text m={0} variant='helperText' _dark={{ color: 'text.dark', opacity: 0.8 }}>
								{`${value ? value.length : 0}/${maxLength}`}
							</Text>
						</Flex>
					) : (
						false
					)}
				</InputGroup>
				<Flex direction='row' pt={1} mb={0} alignItems='top' gap={4} justifyContent='space-between'>
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

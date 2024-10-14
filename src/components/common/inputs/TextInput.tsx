import { ChangeEvent, forwardRef, ReactNode, useState, useEffect } from 'react';
import {
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
	Wrap,
} from '@chakra-ui/react';
import FormErrorText from '@common/FormErrorText';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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

const TextInput = forwardRef<HTMLInputElement, Props>(
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
		},
		forwardedRef
	) => {
		const inputVariant = variant ? variant : 'filled';

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

		const [localValue, setLocalValue] = useState(value);

		useEffect(() => {
			setLocalValue(value);
		}, [value]);

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setLocalValue(newValue);

			onChange(e);
		};

		return (
			<FormControl isRequired={isRequired} isInvalid={!!error} my={1} {...props}>
				<InputGroup position={'relative'}>
					{leftElement && (
						<InputLeftElement
							pointerEvents={'none'}
							_dark={{ color: 'text.dark' }}
							boxSize={boxSize()}
						>
							{leftElement}
						</InputLeftElement>
					)}
					<Input
						variant={inputVariant}
						focusBorderColor={'brand.blue'}
						placeholder={placeholder}
						isDisabled={isDisabled}
						px={3}
						value={localValue}
						name={name}
						ref={forwardedRef}
						fontSize={sizeToken}
						size={sizeToken}
						onChange={handleChange}
						_dark={{
							color: 'text.dark',
						}}
						maxLength={maxLength ? maxLength : undefined}
						{...inputProps}
					/>
					{maxLength ? (
						<Flex position={'absolute'} right={1} top={0} height={'full'} alignItems={'flex-end'}>
							<Text m={0} variant={'helperText'} _dark={{ color: 'text.dark', opacity: 0.8 }}>
								{`${localValue ? localValue.length : 0}/${maxLength}`}
							</Text>
						</Flex>
					) : null}
				</InputGroup>
				<Flex
					direction={'row'}
					pt={1}
					my={0}
					alignItems={'top'}
					justifyContent={'space-between'}
				>
					{label ? (
						<FormLabel
							ml={2}
							w={'full'}
							mr={0}
							my={0}
							pt={0}
							lineHeight={'normal'}
							fontSize={'sm'}
							flexGrow={'1'}
							sx={{
								visibility: labelHidden ? 'hidden' : 'visible',
								position: labelHidden ? 'absolute' : 'initial',
							}}
						>
							{label}
						</FormLabel>
					) : null}
				</Flex>
				<Wrap w={'full'} alignItems={'flex-start'} opacity={0.9} fontStyle={'italic'}>
					<FormHelperText my={0} flex={'1'} w={'full'}>
						<Flex
							w={'full'}
							justifyContent={'space-between'}
							alignItems={'center'}
							lineHeight={'normal'}
						>
							{error ? (
								<FormErrorText message={error} />
							) : helperText ? (
								<Text m={0} variant={'helperText'} fontSize={'2xs'}>
									{helperText}
								</Text>
							) : null}
						</Flex>
					</FormHelperText>
				</Wrap>
			</FormControl>
		);
	}
);

export default TextInput;

import { ChangeEvent, ReactNode } from 'react';
import { FormControl, FormHelperText, FormLabel, Textarea } from '@chakra-ui/react';

interface Props {
	name: string;
	label?: string;
	helperText?: string;
	placeholder?: string;
	value?: string;
	leftElement?: ReactNode;
	onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
	inputProps?: {
		[prop: string]: any;
	};
	[prop: string]: any;
}

export default function TextareaInput({
	label,
	labelHidden,
	helperText,
	placeholder,
	value,
	name,
	onChange,
	inputProps,
	...props
}: Props) {
	return (
		<FormControl {...props}>
			<Textarea
				variant={'filled'}
				placeholder={placeholder}
				focusBorderColor={'blue.200'}
				value={value ? value : ''}
				name={name}
				resize={'vertical'}
				onChange={onChange}
				{...inputProps}
			/>
			{label ? (
				<FormLabel
					ml={2}
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

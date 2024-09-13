import { ChangeEvent, ReactNode, useState } from 'react';
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

/**
 * TextareaInput component for rendering a controlled textarea with optional debouncing.
 *
 * @param props - Component props.
 * @returns {JSX.Element} The rendered TextareaInput component.
 */
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
}: Props): JSX.Element {
	const [localValue, setLocalValue] = useState(value);

	/**
	 * Handles the change event for the textarea.
	 *
	 * @param {ChangeEvent<HTMLTextAreaElement>} e - The change event.
	 */
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setLocalValue(newValue);

		onChange(e);
	};

	return (
		<FormControl {...props}>
			<Textarea
				variant={'filled'}
				placeholder={placeholder}
				focusBorderColor={'blue.200'}
				value={localValue ? localValue : ''}
				name={name}
				resize={'vertical'}
				onChange={handleChange}
				isDisabled={props.isDisabled}
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

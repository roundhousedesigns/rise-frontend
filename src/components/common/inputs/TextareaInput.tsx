import { ChangeEvent, ReactNode, useCallback, useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import {
	FormControl,
	FormControlProps,
	FormHelperText,
	FormLabel,
	Textarea,
	TextareaProps,
} from '@chakra-ui/react';

interface Props {
	name: string;
	label?: string;
	labelHidden?: boolean;
	helperText?: string;
	placeholder?: string;
	value?: string;
	leftElement?: ReactNode;
	onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
	debounceTime?: number;
	onDebounceStart?: () => void;
	onDebounceEnd?: () => void;
	inputProps?: TextareaProps;
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
	debounceTime,
	onDebounceStart,
	onDebounceEnd,
	...props
}: Props & FormControlProps): JSX.Element {
	const [localValue, setLocalValue] = useState(value);
	const isDebouncing = useRef(false);

	/**
	 * Handles the debounced change event for the textarea.
	 *
	 * @param {string} value - The new value of the textarea.
	 */
	const handleDebouncedChange = (value: string) => {
		onChange({ target: { name, value } } as ChangeEvent<HTMLTextAreaElement>);
		isDebouncing.current = false;
		onDebounceEnd?.();
	};

	const debouncedOnChange = useCallback(debounce(handleDebouncedChange, debounceTime), [
		onChange,
		name,
		debounceTime,
		onDebounceEnd,
	]);

	/**
	 * Handles the change event for the textarea.
	 *
	 * @param {ChangeEvent<HTMLTextAreaElement>} e - The change event.
	 */
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		if (debounceTime) {
			if (!isDebouncing.current) {
				isDebouncing.current = true;
				onDebounceStart?.();
			}
			handleDebouncedChange(newValue);
		} else {
			onChange(e);
		}
	};

	useEffect(() => {
		return () => {
			debouncedOnChange.cancel();
		};
	}, [debouncedOnChange]);

	return (
		<FormControl {...props}>
			<Textarea
				variant='filled'
				placeholder={placeholder}
				focusBorderColor={'blue.200'}
				value={localValue ? localValue : ''}
				name={name}
				resize='vertical'
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

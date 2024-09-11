import { ChangeEvent, ReactNode, useCallback, useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
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
	debounceTime?: number;
	onDebounceStart?: () => void;
	onDebounceEnd?: () => void;
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
	debounceTime,
	onDebounceStart,
	onDebounceEnd,
	...props
}: Props) {
	const [localValue, setLocalValue] = useState(value);

	const isDebouncing = useRef(false);

	const debouncedOnChange = useCallback(
		debounce((value: string) => {
			onChange({ target: { name, value } } as ChangeEvent<HTMLTextAreaElement>);
			isDebouncing.current = false;
			onDebounceEnd?.();
		}, debounceTime),
		[onChange, name, debounceTime, onDebounceEnd]
	);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		if (debounceTime) {
			if (!isDebouncing.current) {
				isDebouncing.current = true;
				onDebounceStart?.();
			}
			debouncedOnChange(newValue);
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

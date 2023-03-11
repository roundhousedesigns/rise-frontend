import { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { FormControl, FormHelperText, FormLabel, Input, VisuallyHidden } from '@chakra-ui/react';

interface Props {
	name?: string;
	label: string;
	labelVisuallyHidden?: boolean;
}

// TODO Move this to types.ts
export interface FileInputRef {
	reset: () => void;
}

const FileInput = forwardRef<FileInputRef, Props>(({ name, label, labelVisuallyHidden }, ref) => {
	const [, setFile] = useState<FileList | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useImperativeHandle(ref, () => ({
		reset: () => {
			setFile(null);
			if (inputRef.current) {
				inputRef.current.value = '';
			}
		},
	}));

	const Label = () => {
		return labelVisuallyHidden ? (
			<FormLabel m={0} p={0} as={VisuallyHidden}>
				{label}
			</FormLabel>
		) : (
			<FormLabel m={0} p={0}>
				{label}
			</FormLabel>
		);
	};

	return (
		<FormControl>
			<Label />
			<Input
				type='file'
				ref={inputRef}
				name={name ? name : ''}
				id={name ? name : ''}
				sx={{
					'::file-selector-button': {
						height: 10,
						padding: 0,
						mr: 4,
						background: 'none',
						border: 'none',
						fontWeight: 'bold',
					},
				}}
				onChange={(e) => setFile(e.target.files)}
			/>
			<FormHelperText>
				<VisuallyHidden>Attach a file.</VisuallyHidden>
			</FormHelperText>
		</FormControl>
	);
});

export default FileInput;

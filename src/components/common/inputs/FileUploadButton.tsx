import { ChangeEvent, useRef } from 'react';
import { Button, ButtonProps, VisuallyHidden, chakra } from '@chakra-ui/react';

interface Props {
	fieldName: string;
	icon?: JSX.Element;
	accept?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	loading?: boolean;
	children?: JSX.Element;
}

export default function FileUploadButton({
	fieldName,
	icon,
	accept,
	onChange,
	loading,
	children,
	...props
}: Props & ButtonProps): JSX.Element {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<Button
			tabIndex={0}
			leftIcon={icon ? icon : undefined}
			size='md'
			w='full'
			colorScheme='green'
			opacity={loading ? 0.5 : 1}
			cursor={loading ? 'progress' : 'pointer'}
			isDisabled={loading}
			onClick={handleButtonClick}
			{...props}
		>
			{children}
			<VisuallyHidden>
				<chakra.input
					ref={fileInputRef}
					type='file'
					name={fieldName}
					accept={accept}
					onChange={onChange}
					tabIndex={-1}
				/>
			</VisuallyHidden>
		</Button>
	);
}

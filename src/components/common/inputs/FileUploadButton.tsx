import { useRef } from 'react';
import { Button, VisuallyHidden } from '@chakra-ui/react';

export default function FileUploadButton({
	fieldName,
	content = 'Upload',
	icon,
	accept,
	onChange,
	loading,
}: {
	fieldName: string;
	content?: string | number | JSX.Element;
	icon?: JSX.Element;
	accept?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	loading?: boolean;
}) {
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
		>
			{content}
			<VisuallyHidden>
				<input
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

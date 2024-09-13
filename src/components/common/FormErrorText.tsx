import { FormErrorMessage } from '@chakra-ui/react';

interface FormErrorTextProps {
	message: string | string[];
}

const FromErrorText = ({ message }: FormErrorTextProps) => {
	const formattedMessage = Array.isArray(message) ? message.join(', ') : message;

	return (
		<FormErrorMessage fontWeight={'bold'} mt={0} flex={'1'} fontSize={'xs'}>
			{formattedMessage}
		</FormErrorMessage>
	);
};

export default FromErrorText;

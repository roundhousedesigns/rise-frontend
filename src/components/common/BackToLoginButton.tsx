import { Flex, FlexProps, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function LoginLink({ ...props }: FlexProps): JSX.Element {
	return (
		<Flex alignItems='center' textAlign='right' flexWrap='wrap' {...props}>
			<Heading size='sm' mr={2} mb={0}>
				Already have <br />
				an account?
			</Heading>
			<Button as={RouterLink} to={'/login'} colorScheme='blue' tabIndex={9}>
				Back To Login
			</Button>
		</Flex>
	);
}

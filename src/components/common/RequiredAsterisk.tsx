import { chakra } from '@chakra-ui/react';

const RequiredAsterisk = ({ ...props }: { [prop: string]: any }) => {
	return (
		<chakra.span color={'red.300'} ml={1} {...props}>
			*
		</chakra.span>
	);
};

export default RequiredAsterisk;

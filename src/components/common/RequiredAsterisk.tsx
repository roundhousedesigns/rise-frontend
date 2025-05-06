import { chakra, BoxProps } from '@chakra-ui/react';

const RequiredAsterisk = ({ ...props }: BoxProps) => {
	return (
		<chakra.span color={'red.300'} ml={1} {...props}>
			*
		</chakra.span>
	);
};

export default RequiredAsterisk;

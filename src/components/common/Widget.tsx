import { Box, BoxProps } from '@chakra-ui/react';

interface Props {
	children: JSX.Element;
}

const Widget = ({ children, ...props }: Props & BoxProps) => (
	<Box m={0} {...props}>
		{children}
	</Box>
);

export default Widget;

import { chakra, CircleProps } from '@chakra-ui/react';

const RiseStar = ({ ...props }: CircleProps) => (
	<chakra.span px={2} {...props}>
		✺
	</chakra.span>
);

export default RiseStar;

import { chakra } from '@chakra-ui/react';

const RiseStar = ({ ...props }: { [prop: string]: any }) => (
	<chakra.span px={2} {...props}>
		✺
	</chakra.span>
);

export default RiseStar;

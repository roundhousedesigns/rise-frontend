import { Circle, CircleProps } from '@chakra-ui/react';

const RiseStar = ({ ...props }: CircleProps) => (
	<Circle height='auto' width='auto' px={1} lineHeight='normal' title='separator' {...props}>
		✺
	</Circle>
);

export default RiseStar;

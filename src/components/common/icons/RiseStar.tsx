import { Circle, CircleProps } from '@chakra-ui/react';

const RiseStar = ({ ...props }: CircleProps) => (
	<Circle
		height='auto'
		width='auto'
		px={2}
		lineHeight='normal'
		title='separator'
		display='inline'
		{...props}
	>
		✺
	</Circle>
);

export default RiseStar;

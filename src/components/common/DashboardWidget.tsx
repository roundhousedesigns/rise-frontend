import { Box } from '@chakra-ui/react';

interface Props {
	children: JSX.Element;
	[prop: string]: any;
}

const DashboardWidget = ({ children, ...props }: Props) => (
	<Box m={0} {...props}>
		{children}
	</Box>
);

export default DashboardWidget;

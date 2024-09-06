import { ReactNode } from 'react';
import { Box, Heading, Text, Flex, Spinner, Center } from '@chakra-ui/react';

interface Props {
	title?: string;
	description?: string | JSX.Element;
	actions?: ReactNode;
	loading?: boolean;
	children: ReactNode;
	[prop: string]: any;
}

export default function Page({ title, description, actions, loading, children, ...props }: Props) {
	return loading ? (
		<Center>
			<Spinner position={'relative'} top={12} />
		</Center>
	) : (
		<Box mt={3} {...props}>
			{!!title || !!actions ? (
				<Flex justifyContent={'space-between'} alignItems={'flex-end'} gap={2} flexWrap={'wrap'}>
					{title ? (
						<Heading variant={'pageTitle'} as={'h1'} my={0} lineHeight={'normal'}>
							{title}
						</Heading>
					) : null}

					{actions ? (
						<Flex flexWrap={'wrap'} gap={2} justifyContent={'flex-end'}>
							{actions}
						</Flex>
					) : null}
				</Flex>
			) : null}

			{description ? (
				<Text as={Box} ml={1} fontSize={'sm'}>
					{description}
				</Text>
			) : null}

			{children}
		</Box>
	);
}

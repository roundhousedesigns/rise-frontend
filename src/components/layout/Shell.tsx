import { ReactNode } from 'react';
import {
	Box,
	Heading,
	Text,
	Flex,
	Spinner,
	Center,
	ContainerProps,
	Container,
	HeadingProps,
} from '@chakra-ui/react';

interface Props {
	title?: string;
	description?: string | JSX.Element;
	actions?: ReactNode;
	loading?: boolean;
	children: ReactNode;
	titleProps?: HeadingProps;
}

export default function Shell({
	title,
	description,
	actions,
	loading,
	children,
	titleProps,
	...props
}: Props & ContainerProps): JSX.Element {
	return loading ? (
		<Center>
			<Spinner position='relative' top={12} />
		</Center>
	) : (
		<Box pt={4} pr={0} pb={8} pl={0} mt={0} mb={0} {...props}>
			{!!title || !!actions ? (
				<Flex
					justifyContent={'space-between'}
					alignItems={'flex-end'}
					gap={2}
					flexWrap='wrap'
					m={0}
					py={0}
					px={4}
				>
					{title ? (
						<Heading
							variant='pageTitle'
							as='h1'
							flex='1'
							my={0}
							px={0}
							lineHeight='normal'
							w='full'
							{...titleProps}
						>
							{title}
						</Heading>
					) : null}

					{actions ? (
						<Flex flexWrap='wrap' gap={2} justifyContent={'flex-end'}>
							{actions}
						</Flex>
					) : null}
				</Flex>
			) : null}

			{description ? (
				<Text as={Box} ml={1} fontSize='sm'>
					{description}
				</Text>
			) : null}

			<Box px={4} mx='auto'>
				{children}
			</Box>
		</Box>
	);
}

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
	fullWidthTemplate?: boolean;
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
	fullWidthTemplate,
	children,
	titleProps,
	...props
}: Props & ContainerProps): JSX.Element {
	const fullWidthTitleProps = {
		maxWidth: '5xl',
		mx: 'auto',
	};

	return loading ? (
		<Center>
			<Spinner position='relative' top={12} />
		</Center>
	) : (
		<Container
			maxWidth={fullWidthTemplate ? 'full' : '4xl'}
			pt={fullWidthTemplate ? 4 : 0}
			px={4}
			mt={fullWidthTemplate ? 0 : 6}
			mb={4}
			mx='auto'
			{...props}
		>
			{!!title || !!actions ? (
				<Flex
					justifyContent={'space-between'}
					alignItems={'flex-end'}
					gap={2}
					flexWrap='wrap'
					m={0}
					py={0}
					pb={1}
					px={0}
					borderBottom='1px solid'
					borderColor='gray.200'
					{...(fullWidthTemplate ? fullWidthTitleProps : {})}
				>
					{title && (
						<Heading
							variant='pageTitle'
							as='h1'
							my={0}
							p={0}
							lineHeight='normal'
							textAlign='left'
							{...titleProps}
						>
							{title}
						</Heading>
					)}

					{actions && (
						<Flex flexWrap='wrap' gap={2} justifyContent={'flex-end'}>
							{actions}
						</Flex>
					)}
				</Flex>
			) : null}

			{description ? (
				<Text as={Box} ml={1} fontSize='sm'>
					{description}
				</Text>
			) : null}

			<Box px={0} mx='auto'>
				{children}
			</Box>
		</Container>
	);
}

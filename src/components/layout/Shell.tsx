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
	titleContainerWidth?: string;
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
	titleContainerWidth,
	children,
	titleProps,
	...props
}: Props & ContainerProps): JSX.Element {
	const fullWidthTitleProps = {
		maxWidth: titleContainerWidth || '5xl',
		mx: 'auto',
	};

	return loading ? (
		<Center>
			<Spinner position={'relative'} top={12} />
		</Center>
	) : (
		<Container
			maxWidth={fullWidthTemplate ? 'full' : '5xl'}
			pt={fullWidthTemplate ? 4 : 0}
			px={0}
			mx={'auto'}
			mt={fullWidthTemplate ? 0 : 3}
			mb={4}
			{...props}
		>
			{!!title || !!actions ? (
				<Flex
					justifyContent={'space-between'}
					alignItems={'flex-end'}
					gap={2}
					flexWrap={'wrap'}
					m={0}
					p={0}
					{...(fullWidthTemplate ? fullWidthTitleProps : {})}
				>
					{title ? (
						<Heading
							variant={'pageTitle'}
							as={'h1'}
							my={0}
							px={4}
							lineHeight={'normal'}
							{...titleProps}
						>
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

			<Box px={4} mx={'auto'}>
				{children}
			</Box>
		</Container>
	);
}

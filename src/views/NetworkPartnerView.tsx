import {
	ContainerProps,
	Container,
	Heading,
	HeadingProps,
	Box,
	Grid,
	Flex,
	chakra,
	Image,
	Link,
	Button,
	Stack,
	useMediaQuery,
	Divider,
} from '@chakra-ui/react';
import parse from 'html-react-parser';
import { WPNetworkPartner } from '@lib/classes';
import useNetworkPartners from '@queries/useNetworkPartners';
import { useEffect, useState } from 'react';

interface Props {
	postId?: string | number;
	titleProps?: HeadingProps;
}

export default function NetworkPartnerView({
	postId,
	titleProps,
	...props
}: Props & ContainerProps) {
	const [pages] = useNetworkPartners({ id: Number(postId) });
	const [page, setPage] = useState<WPNetworkPartner | null>(null);

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	useEffect(() => {
		if (pages.length > 0 && !page) {
			setPage(pages[0]);
		}
	}, [pages, page]);

	const content = page?.content ? parse(page.content) : null;

	return (
		<>
			<Box
				w='full'
				px={0}
				mx={0}
				h='50vh'
				bgImage={page?.coverBg?.sourceUrl}
				bgSize='cover'
				bgPosition='center'
				bgRepeat='no-repeat'
				display='flex'
				alignItems='center'
				justifyContent='center'
				position='relative'
			>
				<Heading
					as='h1'
					mb={4}
					{...titleProps}
					position='relative'
					zIndex={1}
					p={4}
					borderRadius='md'
					color='white'
					bg='brand.blue'
					maxWidth='80vw'
				>
					{page?.title}
				</Heading>
				<Box
					w='full'
					h='full'
					bg='black'
					position='absolute'
					top={0}
					left={0}
					zIndex={0}
					opacity={0.35}
				></Box>
			</Box>
			<Container
				variant='pageContent'
				className={'wp-post-content network-partner'}
				{...props}
				mt={4}
				px={4}
				fontSize='lg'
			>
				<Flex gap={4} flexDirection={{ base: 'column-reverse', md: 'row' }}>
					<Stack flex='auto' maxW='200px' mx={{ base: 'auto', md: 0 }}>
						<chakra.figure>
							<Image srcSet={page?.featuredImage?.srcSet} alt={page?.title} />
						</chakra.figure>
						{page?.externalUrl ? (
							<Button
								as={Link}
								href={page.externalUrl}
								target='_blank'
								rel='noopener noreferrer'
								textAlign='center'
								mx='auto'
								textDecoration='none !important'
							>
								Visit Website
							</Button>
						) : null}
					</Stack>

					{!isLargerThanMd && <Divider />}

					<Box flex='1' className='content'>
						{content}
					</Box>
				</Flex>
			</Container>
		</>
	);
}

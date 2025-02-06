import {
	Box,
	List,
	ListItem,
	Spinner,
	Card,
	Image,
	Text,
	Link,
	Stack,
	SimpleGrid,
	SimpleGridProps,
	useToken,
	Heading,
	useColorMode,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import parse from 'html-react-parser';
import useNetworkPartners from '@queries/useNetworkPartners';
import ErrorAlert from '@common/ErrorAlert';

export default function NetworkPartnerList({ ...props }: SimpleGridProps): JSX.Element {
	const [partners, { loading, error }] = useNetworkPartners();

	const [blue] = useToken('colors', ['brand.blue']);
	const { colorMode } = useColorMode();

	if (loading) return <Spinner />;
	if (error) return <ErrorAlert message={error.message} />;

	return (
		<SimpleGrid
			as={List}
			spacing={4}
			columns={{ base: 1, md: 3 }}
			maxWidth='5xl'
			mx='auto'
			{...props}
		>
			<AnimatePresence>
				{partners.map((partner) => (
					<ListItem
						key={partner.id}
						as={motion.li}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Card variant='listItem' p={4}>
							<Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
								<Link
									as={RouterLink}
									to={`/partners/${partner.slug}`}
									textDecoration='none'
									_hover={{ textDecoration: 'none' }}
									color='inherit'
									title={partner.title}
									rel='bookmark'
								>
									{partner.featuredImage && (
										<Box flex='0 0 200px'>
											<Image
												srcSet={partner.featuredImage.srcSet}
												alt={`Logo for ${partner.title || ''}`}
												borderRadius='md'
												objectFit='cover'
												border='2px solid'
												borderColor={blue}
												mb={4}
											/>
										</Box>
									)}
									<Heading
										as={'h3'}
										variant={'contentSubtitle'}
										color='brand.blue'
										textAlign={'center'}
									>
										{partner.title}
									</Heading>
									{partner.excerpt && (
										<Text variant={'postExcerpt'} textAlign={'center'}>
											{parse(partner.excerpt)}
										</Text>
									)}
								</Link>
							</Stack>
						</Card>
					</ListItem>
				))}
			</AnimatePresence>
		</SimpleGrid>
	);
}

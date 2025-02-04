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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import parse from 'html-react-parser';
import useNetworkPartners from '@queries/useNetworkPartners';
import ErrorAlert from '@common/ErrorAlert';

export default function NetworkPartnerList({ ...props }: SimpleGridProps): JSX.Element {
	const [partners, { loading, error }] = useNetworkPartners();

	const [yellow, green, red, orange, blue] = useToken('colors', [
		'brand.yellow',
		'brand.green',
		'brand.red',
		'brand.orange',
		'brand.blue',
	]);

	if (loading) return <Spinner />;
	if (error) return <ErrorAlert message={error.message} />;

	console.info(partners);

	return (
		<SimpleGrid as={List} spacing={4} columns={{ base: 1, md: 3 }} {...props}>
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
												borderColor={
													[yellow, green, red, orange, blue][Math.floor(Math.random() * 5)]
												}
												mb={4}
											/>
										</Box>
									)}
									{partner.excerpt && <Text variant={'postExcerpt'}>{parse(partner.excerpt)}</Text>}
								</Link>
							</Stack>
						</Card>
					</ListItem>
				))}
			</AnimatePresence>
		</SimpleGrid>
	);
}

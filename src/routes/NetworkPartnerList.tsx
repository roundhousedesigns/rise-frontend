import {
	Box,
	List,
	ListItem,
	Spinner,
	Card,
	Image,
	Text,
	Link,
	SimpleGrid,
	SimpleGridProps,
	ChakraBaseProvider,
	chakra,
	Heading,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import parse from 'html-react-parser';
import useNetworkPartners from '@queries/useNetworkPartners';
import ErrorAlert from '@common/ErrorAlert';

export default function NetworkPartnerList({ ...props }: SimpleGridProps): JSX.Element {
	const [partners, { loading, error }] = useNetworkPartners();

	if (loading) return <Spinner />;
	if (error) return <ErrorAlert message={error.message} />;

	return (
		<SimpleGrid as={List} spacing={6} minChildWidth='300px' maxWidth='5xl' mx='auto' {...props}>
			<AnimatePresence>
				{partners.map((partner) => (
					<ListItem
						key={partner.id}
						as={motion.li}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Link
							as={RouterLink}
							to={`/partners/${partner.slug}`}
							textDecoration='none'
							_hover={{ textDecoration: 'none' }}
							color='inherit'
							title={partner.title}
							rel='bookmark'
						>
							<Card
								variant='listItem'
								pt={4}
								pb={5}
								px={4}
								mx={0}
								border='1px solid'
								borderColor='gray.200'
								_light={{
									bg: 'gray.100',
									color: 'text.dark',
									borderColor: 'gray.200',
									_hover: { bg: 'gray.200' },
								}}
								_dark={{
									bg: 'gray.700',
									color: 'text.light',
									borderColor: 'gray.600',
									_hover: { bg: 'gray.600' },
								}}
								transition='background-color 150ms ease'
							>
								<Box>
									{partner.featuredImage && (
										<chakra.figure flex='0 0 200px'>
											<Image
												srcSet={partner.featuredImage.srcSet}
												alt={`Logo for ${partner.title || ''}`}
												borderRadius='md'
												objectFit='cover'
												border={'1px solid'}
												backgroundColor='gray.50'
												_light={{ borderColor: 'gray.200' }}
												_dark={{ borderColor: 'gray.700' }}
												mb={4}
											/>
										</chakra.figure>
									)}
									<Heading as='h3' size='md' textAlign='center' color='brand.blue' my={3}>
										{partner.title}
									</Heading>
									{partner.excerpt && (
										<Text variant='postExcerpt' textAlign='center'>
											{parse(partner.excerpt)}
										</Text>
									)}
								</Box>
							</Card>
						</Link>
					</ListItem>
				))}
			</AnimatePresence>
		</SimpleGrid>
	);
}

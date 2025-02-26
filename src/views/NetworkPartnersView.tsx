import { useState } from 'react';
import { Box, Button, Container, Spinner, Text, useColorMode, useToken } from '@chakra-ui/react';
import NetworkPartnerList from '@routes/NetworkPartnerList';
import PageView from '@views/PageView';
import useNetworkPartners from '@queries/useNetworkPartners';
import ErrorAlert from '@common/ErrorAlert';
import useNetworkPartnerCategoryTerms from '@queries/useNetworkPartnerCategoryTerms';

export default function NetworkPartnersView() {
	const [networkPartnerCategories, setNetworkPartnerCategories] = useState<string[]>([]);
	const [partners, { loading, error }] = useNetworkPartners({
		networkPartnerCategories,
	});

	const [
		networkPartnerCategoryTerms,
		{ loading: networkPartnerCategoryTermsLoading, error: networkPartnerCategoryTermsError },
	] = useNetworkPartnerCategoryTerms();

	const [light, dark, blue, yellow] = useToken('colors', [
		'bg.light',
		'bg.dark',
		'brand.blue',
		'brand.yellow',
	]);
	const { colorMode } = useColorMode();

	return (
		<Box w='100vw' position='relative' left='-1rem'>
			{error ? (
				<ErrorAlert message={error.message} />
			) : (
				<>
					<Box
						position='relative'
						width='full'
						_after={{
							content: '""',
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							height: '70px',
							background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 12' preserveAspectRatio='none'%3E%3Cpolygon fill='${
								colorMode === 'light' ? encodeURIComponent(light) : encodeURIComponent(dark)
							}' points='0,2 50,8 100,2 100,12 0,12'/%3E%3Cpath fill='${encodeURIComponent(
								yellow
							)}' d='M-2,1.4 L50,7.4 L102,1.4 L102,2.6 L50,8.6 L-2,2.6 Z'/%3E%3C/svg%3E")`,
							backgroundSize: '100% 100%',
						}}
					>
						<Box w='full' color={'text.light'}>
							<PageView
								postId={15106}
								px={4}
								py={4}
								pb={20}
								w='4xl'
								bg={blue}
								textAlign='center'
								fontSize='xl'
								maxW='full'
							/>
							<Box w='full' bg='brand.green' h='150px'>
								<Text fontSize='2xl' textAlign='center' mb={1} py={6}>
									{networkPartnerCategoryTerms?.map((term) => (
										<Button
											key={term.id}
											variant='outline'
											colorScheme='white'
											mx={2}
											mb={2}
											onClick={() => {
												setNetworkPartnerCategories((prev) => {
													if (!term.slug) return prev;
													const isSelected = prev.includes(term.slug);
													return isSelected
														? prev.filter((slug) => slug !== term.slug)
														: [...prev, term.slug];
												});
											}}
											bg={
												term.slug && networkPartnerCategories.includes(term.slug)
													? 'whiteAlpha.200'
													: 'transparent'
											}
										>
											{term.name}
										</Button>
									))}
								</Text>
							</Box>
						</Box>
					</Box>

					<Box
						position='relative'
						width='full'
						py={8}
						_light={{
							bg: light,
						}}
						_dark={{
							bg: dark,
						}}
					>
						<Container maxW={{ base: 'full', md: '4xl' }} px={4}>
							{loading ? <Spinner /> : <NetworkPartnerList partners={partners} />}
						</Container>
					</Box>
				</>
			)}
		</Box>
	);
}

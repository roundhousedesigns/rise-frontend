import { Box, Container, Heading, useColorMode, useToken } from '@chakra-ui/react';
import NetworkPartnerList from '@routes/NetworkPartnerList';
import PageView from '@views/PageView';

export default function NetworkPartnersView() {
	const [light, dark, blue, green] = useToken('colors', [
		'bg.light',
		'bg.dark',
		'brand.blue',
		'brand.green',
	]);
	const { colorMode } = useColorMode();

	console.log(light, dark, blue, green);

	return (
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
					background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 12' preserveAspectRatio='none'%3E%3Cpolygon fill='${colorMode === 'light' ? encodeURIComponent(light) : encodeURIComponent(dark)}' points='0,2 50,8 100,2 100,12 0,12'/%3E%3Cpath fill='${encodeURIComponent(
						green
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
						textAlign={'center'}
						fontSize={'lg'}
					/>
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
				<NetworkPartnerList />
			</Box>
		</>
	);
}

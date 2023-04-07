import ReactPlayer from 'react-player';
import { Box, Heading } from '@chakra-ui/react';

export default function VideoPreview(oEmbed: string) {
	return (
		<Box bg='gray.300' p={4} borderRadius='md'>
			<Heading variant='contentSubtitle'>Preview</Heading>
			<ReactPlayer url={oEmbed} controls width='100%' />
		</Box>
	);
}

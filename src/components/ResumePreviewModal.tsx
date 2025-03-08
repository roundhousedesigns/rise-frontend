import {
	useDisclosure,
	Box,
	Flex,
	Image,
	Icon,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Link,
	Text,
	useColorMode,
	BoxProps,
} from '@chakra-ui/react';
import { FiZoomIn, FiDownload } from 'react-icons/fi';

interface ModalProps {
	resumePreviewSrc?: string;
	resumeLink: string;
	previewIcon?: boolean;
}

export default function ResumePreviewModal({
	resumePreviewSrc,
	resumeLink,
	previewIcon = true,
	...props
}: ModalProps & BoxProps): JSX.Element | null {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();

	return resumePreviewSrc && resumeLink ? (
		<>
			<Box pos='relative' {...props}>
				{previewIcon ? (
					<Flex
						bg={'blackAlpha.300'}
						pos='absolute'
						w='full'
						h='full'
						alignItems='center'
						justifyContent='center'
						onClick={onOpen}
						cursor='pointer'
						transition={'all 200ms ease'}
						color={'whiteAlpha.800'}
						_hover={{
							bg: 'blackAlpha.50',
							color: 'blackAlpha.800',
						}}
					>
						<Icon as={FiZoomIn} boxSize={10} />
					</Flex>
				) : (
					false
				)}
				<Image
					src={resumePreviewSrc}
					sizes='100vw'
					alt={'Resume preview'}
					w='full'
					h='auto'
					loading='eager'
					fit='cover'
					onClick={previewIcon ? undefined : onOpen}
					cursor={previewIcon ? undefined : 'pointer'}
					borderRadius='md'
				/>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Resume Preview</ModalHeader>
					<ModalCloseButton />
					<ModalBody bgColor={colorMode === 'dark' ? 'gray' : 'blackAlpha.200'} pt={4}>
						<Image
							src={resumePreviewSrc}
							alt={`Profile picture`}
							loading='eager'
							fit='cover'
							borderRadius='md'
							w='full'
						/>
						<Text fontSize='sm'>Previewing the first page only.</Text>
					</ModalBody>

					<ModalFooter>
						<Button
							leftIcon={<FiDownload />}
							colorScheme='green'
							as={Link}
							href={resumeLink}
							my={0}
							download
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	) : null;
}

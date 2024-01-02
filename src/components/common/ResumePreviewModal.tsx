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
} from '@chakra-ui/react';
import { FiZoomIn, FiDownload, FiXCircle } from 'react-icons/fi';

interface ModalProps {
	resumePreview: string;
	resumeLink: string;
	previewIcon?: boolean;
}

export default function ResumePreviewModal({
	resumePreview,
	resumeLink,
	previewIcon = true,
}: ModalProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return resumePreview && resumeLink ? (
		<>
			<Box pos='relative'>
				{previewIcon ? (
					<Flex
						bg='blackAlpha.300'
						pos='absolute'
						w='full'
						h='full'
						alignItems='center'
						justifyContent='center'
						onClick={onOpen}
						cursor='pointer'
						transition='all 200ms ease'
						color='whiteAlpha.800'
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
					src={resumePreview}
					alt='Resume preview'
					w='33vw'
					maxW='200px'
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
					<ModalBody bg={'gray'}>
						<Image
							src={resumePreview}
							alt={`Profile picture`}
							loading='eager'
							fit='cover'
							borderRadius='md'
							w='full'
						/>
						<Text fontSize='xs'>Download the file to see all pages.</Text>
					</ModalBody>

					<ModalFooter>
						<Flex>
							<Button colorScheme='blue' mr={3} onClick={onClose} leftIcon={<FiXCircle />}>
								Close
							</Button>
							<Button
								leftIcon={<FiDownload />}
								colorScheme='green'
								as={Link}
								href={resumeLink}
								target='_blank'
								download
								aria-label='Download Resume'
								mt={0}
							>
								Download
							</Button>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	) : (
		false
	);
}

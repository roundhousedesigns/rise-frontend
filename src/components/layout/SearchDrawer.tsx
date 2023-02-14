import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Accordion,
	Stack,
	Heading,
	IconButton,
	ButtonGroup,
	Button,
	Spacer,
} from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

import SearchList from '../common/SearchList';
import WidgetAccordionItem from '../common/WidgetAccordionItem';

// TODO: Remove this when we have real data
import { _devSavedSearches, _devRecentSearches, _devSavedCandidates } from '../../lib/_devData';
import SearchWizardView from '../../views/SearchWizardView';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const handleSearchSubmit = () => {};
const handleSearchReset = () => {};

export default function SearchDrawer({ isOpen, onClose }: Props) {
	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement='left' size='lg'>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader
					borderBottomWidth='1px'
					fontSize='2xl'
					py={6}
					bg='blackAlpha.800'
					color='whiteAlpha.900'
					borderBottom='2px solid pink'
				>
					<Stack direction='row' justifyContent='space-between' alignItems='center'>
						<Heading size='lg' color='white'>
							Search
						</Heading>
						<Spacer flex='0 0 1em' />
						<Button colorScheme='red' onClick={handleSearchReset} size='md'>
							Reset Filters
						</Button>
						<Spacer />
						<IconButton
							icon={<FiX />}
							colorScheme='white'
							aria-label='Close'
							fontSize='1.4em'
							onClick={onClose}
							variant='invisible'
						/>
					</Stack>
				</DrawerHeader>
				<DrawerBody py={8}>
					<SearchWizardView />
				</DrawerBody>
				<DrawerFooter bg='gray.100' mt={0}>
					{/* TODO Store persistent expand/collapse state (doesn't have to persist on reload, though) */}
					<Accordion allowMultiple={true} width='full'>
						<WidgetAccordionItem heading='Saved Searches'>
							<SearchList items={_devSavedSearches} />
						</WidgetAccordionItem>
						<WidgetAccordionItem heading='Recent Searches'>
							<SearchList items={_devRecentSearches} />
						</WidgetAccordionItem>
					</Accordion>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

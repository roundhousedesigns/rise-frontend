import React from 'react';

import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Accordion,
	Stack,
	Heading,
	IconButton,
} from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

import CandidateList from './CandidateList';
import SearchList from './common/SearchList';
import WidgetAccordionItem from './common/WidgetAccordionItem';

// DUMMY DATA
const _devRecentSearches = [
	'Recent search one',
	'Recent search two',
	'Recent search three',
];
const _devSavedSearches = [
	'Saved search one',
	'Saved search two',
	'Saved search three',
];

export default function SearchDrawer({ isOpen, onClose }) {
	const btnRef = React.useRef();

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader
					borderBottomWidth="1px"
					fontSize="2xl"
					py={6}
					bg="blackAlpha.800"
					color="whiteAlpha.900"
					borderBottom="2px solid pink"
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Heading size="lg" color="white">
							HEADING
						</Heading>
						<IconButton
							ref={btnRef}
							icon={<FiX />}
							color="white"
							aria-label="Close"
							fontSize="1.4em"
							onClick={onClose}
							variant="invisible"
						/>
					</Stack>
				</DrawerHeader>
				<DrawerBody py={8}>
					<Accordion allowToggle index={[0, 1, 2]}>
						<WidgetAccordionItem heading="Saved Candidates">
							<CandidateList />
						</WidgetAccordionItem>
						<WidgetAccordionItem heading="Saved Searches">
							<SearchList items={_devSavedSearches} />
						</WidgetAccordionItem>
						<WidgetAccordionItem heading="Recent Searches">
							<SearchList items={_devRecentSearches} />
						</WidgetAccordionItem>
					</Accordion>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

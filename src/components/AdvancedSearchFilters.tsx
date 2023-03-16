import {
	Heading,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Box,
	Flex,
	chakra,
} from '@chakra-ui/react';
import { Key, useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';

export default function AdvancedSearchFilters(props: any) {
	const {
		search: {
			filters: {
				unions,
				locations,
				experienceLevels,
				genderIdentities,
				racialIdentities,
				personalIdentities,
			},
			advancedFiltersOpen,
		},
		searchDispatch,
	} = useContext(SearchContext);

	const [
		{
			locations: locationTerms,
			unions: unionTerms,
			experienceLevels: experienceLevelTerms,
			genderIdentities: genderIdentityTerms,
			personalIdentities: personalIdentityTerms,
			racialIdentities: racialIdentityTerms,
		},
	] = useUserTaxonomies();

	const handleInputChange = (name: string) => (newValue: string | Key[]) => {
		searchDispatch({
			type: 'SET_FILTER',
			payload: {
				filter: {
					name,
					value: newValue,
				},
			},
		});
	};

	const handleAccordionChange = () => {
		searchDispatch({
			type: 'TOGGLE_ADVANCED_FILTERS_OPEN',
			payload: {},
		});
	};

	const FilterGroup = ({ children, flex }: { children: React.ReactNode; flex?: string }) => (
		<chakra.div flex={flex ? flex : '1 0 32%'}>{children}</chakra.div>
	);

	return (
		<Box {...props}>
			<Accordion
				allowMultiple={true}
				index={advancedFiltersOpen ? [0] : []}
				onChange={handleAccordionChange}
				w='full'
			>
				<AccordionItem>
					<AccordionButton pl={0}>
						<Heading flex='1' textAlign='left' fontSize='xl'>
							Additional Filters
						</Heading>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={2} mb={2} fontSize='sm'>
						<Flex gap={6} flexWrap='wrap'>
							<FilterGroup>
								<Heading size='sm' mb={2}>
									Locations
								</Heading>
								<ProfileCheckboxGroup
									name='locations'
									items={locationTerms}
									checked={locations}
									handleChange={handleInputChange}
								/>
							</FilterGroup>
							<FilterGroup>
								<Heading size='sm' mb={2}>
									Unions
								</Heading>
								<ProfileCheckboxGroup
									name='unions'
									items={unionTerms}
									checked={unions}
									handleChange={handleInputChange}
								/>
							</FilterGroup>
							<FilterGroup>
								<Heading size='sm' mb={2}>
									Experience Levels
								</Heading>
								<ProfileCheckboxGroup
									name='experienceLevels'
									items={experienceLevelTerms}
									checked={experienceLevels}
									handleChange={handleInputChange}
								/>
							</FilterGroup>
							<FilterGroup>
								<Heading size='sm' mb={2} flex='1 0 33%'>
									Gender Identity
								</Heading>
								<ProfileCheckboxGroup
									name='genderIdentities'
									items={genderIdentityTerms}
									checked={genderIdentities}
									handleChange={handleInputChange}
								/>
							</FilterGroup>
							<FilterGroup>
								<Heading size='sm' mb={2}>
									Personal Identity
								</Heading>
								<ProfileCheckboxGroup
									name='personalIdentities'
									items={personalIdentityTerms}
									checked={personalIdentities}
									handleChange={handleInputChange}
								/>
							</FilterGroup>
							<FilterGroup>
								<Heading size='sm' mb={2}>
									Racial Identity
								</Heading>
								<ProfileCheckboxGroup
									name='racialIdentities'
									items={racialIdentityTerms}
									checked={racialIdentities}
									handleChange={handleInputChange}
								/>
							</FilterGroup>
						</Flex>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Box>
	);
}

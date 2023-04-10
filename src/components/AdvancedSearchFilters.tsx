import { Key, useContext } from 'react';
import {
	Heading,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Box,
	Flex,
} from '@chakra-ui/react';
import { SearchContext } from '../context/SearchContext';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';

export default function AdvancedSearchFilters(props: any) {
	const {
		search: {
			filters: {
				locations,
				unions,
				experienceLevels,
				genderIdentities,
				personalIdentities,
				racialIdentities,
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
			racialIdentities: racialIdentityTermsUnfiltered,
		},
	] = useUserTaxonomies();

	// Exclude "white" from racial identities
	const racialIdentityTerms = racialIdentityTermsUnfiltered.filter((item) => item.slug !== 'white');

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
						{advancedFiltersOpen ? (
							<Flex gap={6} flexWrap='wrap'>
								<Box>
									<Heading size='sm' mb={2}>
										Locations
									</Heading>
									<ProfileCheckboxGroup
										name='locations'
										items={locationTerms}
										checked={locations}
										handleChange={handleInputChange}
									/>
								</Box>
								<Box>
									<Heading size='sm' mb={2}>
										Unions
									</Heading>
									<ProfileCheckboxGroup
										name='unions'
										items={unionTerms}
										checked={unions}
										handleChange={handleInputChange}
									/>
								</Box>
								<Box>
									<Heading size='sm' mb={2}>
										Experience Levels
									</Heading>
									<ProfileCheckboxGroup
										name='experienceLevels'
										items={experienceLevelTerms}
										checked={experienceLevels}
										handleChange={handleInputChange}
									/>
								</Box>
								<Box>
									<Heading size='sm' mb={2} flex='1 0 33%'>
										Gender Identity
									</Heading>
									<ProfileCheckboxGroup
										name='genderIdentities'
										items={genderIdentityTerms}
										checked={genderIdentities}
										handleChange={handleInputChange}
									/>
								</Box>
								<Box>
									<Heading size='sm' mb={2}>
										Personal Identity
									</Heading>
									<ProfileCheckboxGroup
										name='personalIdentities'
										items={personalIdentityTerms}
										checked={personalIdentities}
										handleChange={handleInputChange}
									/>
								</Box>
								<Box>
									<Heading size='sm' mb={2}>
										Racial Identity
									</Heading>
									<ProfileCheckboxGroup
										name='racialIdentities'
										items={racialIdentityTerms}
										checked={racialIdentities}
										handleChange={handleInputChange}
									/>
								</Box>
							</Flex>
						) : (
							false
						)}
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Box>
	);
}

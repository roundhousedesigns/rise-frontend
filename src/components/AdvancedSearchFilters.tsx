import {
	Accordion,
	AccordionItem,
	AccordionButton,
	Heading,
	AccordionIcon,
	AccordionPanel,
	Box,
	Flex,
} from '@chakra-ui/react';
import { Key, useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';

/*
Filters:
- Location (tax)
- Willing to travel (meta: bool)
- Unions (tax)
- Gender identity (tax)
- Racial identity (tax)
- Personal identity (tax)
*/

export default function AdvancedSearchFilters() {
	const { search, searchDispatch } = useContext(SearchContext);

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

	return (
		<Accordion allowMultiple={true} w='full'>
			<AccordionItem>
				<AccordionButton>
					<Heading flex='1' textAlign='left' fontSize='xl'>
						Additional Filters
					</Heading>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={2} mb={2} fontSize='sm'>
					<Flex gap={6} flexWrap='wrap'>
						<Box>
							<Heading size='sm' mb={2}>
								Locations
							</Heading>
							<ProfileCheckboxGroup
								name='locations'
								items={locationTerms}
								checked={[]}
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
								checked={[]}
								handleChange={handleInputChange}
							/>
						</Box>
						<Box>
							<Heading size='sm' mb={2}>
								Experience Levels
							</Heading>
							<ProfileCheckboxGroup
								name='unions'
								items={experienceLevelTerms}
								checked={[]}
								handleChange={handleInputChange}
							/>
						</Box>
						<Box>
							<Heading size='sm' mb={2}>
								Gender Identity
							</Heading>
							<ProfileCheckboxGroup
								name='genderIdentities'
								items={genderIdentityTerms}
								checked={[]}
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
								checked={[]}
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
								checked={[]}
								handleChange={handleInputChange}
							/>
						</Box>
					</Flex>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

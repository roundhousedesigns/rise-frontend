import { Key, useContext, useEffect, useState } from 'react';
import { Accordion, Box } from '@chakra-ui/react';
import { SearchContext } from '../context/SearchContext';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';
import SearchFilterAccordionItem from './common/SearchFilterAccordionItem';
import { isEmpty } from 'lodash';

export default function AdditionalSearchFilters() {
	const {
		search: { filters },
		searchDispatch,
	} = useContext(SearchContext);

	// Destructure the filters separately to allow use of `filters`
	const {
		locations,
		unions,
		experienceLevels,
		genderIdentities,
		personalIdentities,
		racialIdentities,
	} = filters;

	const [openFilters, setOpenFilters] = useState<number[]>([]);

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
	// TODO Maybe send 'white' exclusion to the backend
	const racialIdentityTerms = racialIdentityTermsUnfiltered
		? racialIdentityTermsUnfiltered.filter((item) => item.slug !== 'text.light')
		: [];

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

	// Get the index of each filter that has a value
	useEffect(() => {
		const keys: (keyof typeof filters)[] = [
			'locations',
			'unions',
			'experienceLevels',
			'genderIdentities',
			'personalIdentities',
			'racialIdentities',
		];

		keys.forEach((key, index) => {
			if (!isEmpty(filters[key])) {
				// Add the index to the array if it doesn't already exist
				if (!openFilters.includes(index)) {
					setOpenFilters((prevState) => [...prevState, index]);
				}
			} else {
				// Remove the index from the array
				setOpenFilters((prevState) => prevState.filter((item) => item !== index));
			}
		});
	}, [filters]);

	return (
		<Accordion allowMultiple={true} w='full' /*defaultIndex={openFilters}*/>
			<SearchFilterAccordionItem heading='Additional Filters'>
				<Box bgColor='gray.50'>
					{/* The order of these items must match the order of filters in the useEffect. */}
					<SearchFilterAccordionItem heading='Locations'>
						<ProfileCheckboxGroup
							name='locations'
							items={locationTerms}
							checked={locations}
							handleChange={handleInputChange}
						/>
					</SearchFilterAccordionItem>
					<SearchFilterAccordionItem heading='Unions'>
						<ProfileCheckboxGroup
							name='unions'
							items={unionTerms}
							checked={unions}
							handleChange={handleInputChange}
						/>
					</SearchFilterAccordionItem>
					<SearchFilterAccordionItem heading='Experience Levels'>
						<ProfileCheckboxGroup
							name='experienceLevels'
							items={experienceLevelTerms}
							checked={experienceLevels}
							handleChange={handleInputChange}
						/>
					</SearchFilterAccordionItem>
					<SearchFilterAccordionItem heading='Gender Identity'>
						<ProfileCheckboxGroup
							name='genderIdentities'
							items={genderIdentityTerms}
							checked={genderIdentities}
							handleChange={handleInputChange}
						/>
					</SearchFilterAccordionItem>
					<SearchFilterAccordionItem heading='Personal Identity'>
						<ProfileCheckboxGroup
							name='personalIdentities'
							items={personalIdentityTerms}
							checked={personalIdentities}
							handleChange={handleInputChange}
						/>
					</SearchFilterAccordionItem>
					<SearchFilterAccordionItem heading='Racial Identity'>
						<ProfileCheckboxGroup
							name='racialIdentities'
							items={racialIdentityTerms}
							checked={racialIdentities}
							handleChange={handleInputChange}
						/>
					</SearchFilterAccordionItem>
				</Box>
			</SearchFilterAccordionItem>
		</Accordion>
	);
}

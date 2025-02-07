import { Key, useContext, useEffect } from 'react';
import { Accordion } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { additionalFilterKeys } from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import useUserTaxonomies from '@queries/useUserTaxonomies';
import SearchFilterAccordionItem from '@common/SearchFilterAccordionItem';
import ProfileCheckboxGroup from '@common/inputs/ProfileCheckboxGroup';

export default function AdditionalSearchFilters() {
	const {
		search: {
			filters: { filterSet },
			additionalFiltersActive,
		},
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
	} = filterSet;

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
	const racialIdentityTerms = racialIdentityTermsUnfiltered
		? racialIdentityTermsUnfiltered.filter((item) => item.slug !== 'white')
		: [];

	const handleInputChange = (name: string) => (newValue: string | Key[]) => {
		searchDispatch({
			type: 'SET_FILTER',
			payload: {
				filter: {
					key: name,
					value: newValue,
				},
			},
		});
	};

	// Get the index of each filter that has a value
	useEffect(() => {
		const newActiveFilters = additionalFilterKeys.reduce((acc: number[], key, index) => {
			if (!isEmpty(filterSet[key])) return [...acc, index];
			return acc.filter((item) => item !== index);
		}, []);

		searchDispatch({
			type: 'SET_ADDITIONAL_FILTERS_ACTIVE',
			payload: {
				additionalFiltersActive: newActiveFilters,
			},
		});
	}, [filterSet]);

	{
	}
	return (
		/* The order of these items must match the order of filters in the useEffect. */
		<Accordion
			allowMultiple={true}
			w='full'
			defaultIndex={additionalFiltersActive.length ? additionalFiltersActive : undefined}
			mt={0}
			pt={0}
		>
			<SearchFilterAccordionItem heading='Locations'>
				<ProfileCheckboxGroup
					name='locations'
					items={locationTerms}
					checked={locations as string[]}
					handleChange={handleInputChange}
					pt={0}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading='Unions'>
				<ProfileCheckboxGroup
					name='unions'
					items={unionTerms}
					checked={unions as string[]}
					handleChange={handleInputChange}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Experience Levels'}>
				<ProfileCheckboxGroup
					name='experienceLevels'
					items={experienceLevelTerms}
					checked={experienceLevels as string[]}
					handleChange={handleInputChange}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Gender Identity'}>
				<ProfileCheckboxGroup
					name='genderIdentities'
					items={genderIdentityTerms}
					checked={genderIdentities as string[]}
					handleChange={handleInputChange}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Personal Identity'}>
				<ProfileCheckboxGroup
					name='personalIdentities'
					items={personalIdentityTerms}
					checked={personalIdentities as string[]}
					handleChange={handleInputChange}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Racial Identity'}>
				<ProfileCheckboxGroup
					name='racialIdentities'
					items={racialIdentityTerms}
					checked={racialIdentities as string[]}
					handleChange={handleInputChange}
				/>
			</SearchFilterAccordionItem>
		</Accordion>
	);
}

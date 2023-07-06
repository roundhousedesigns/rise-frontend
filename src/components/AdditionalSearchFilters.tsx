import { Key, useContext, useEffect } from 'react';
import { Accordion, Fade } from '@chakra-ui/react';
import { SearchContext } from '../context/SearchContext';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';
import SearchFilterAccordionItem from './common/SearchFilterAccordionItem';
import { isEmpty } from 'lodash';

export default function AdditionalSearchFilters() {
	const {
		search: { filters, searchActive, additionalFiltersActive },
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

	// Filter keys
	const keys: (keyof typeof filters)[] = [
		'locations',
		'unions',
		'experienceLevels',
		'genderIdentities',
		'personalIdentities',
		'racialIdentities',
	];

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
					name,
					value: newValue,
				},
			},
		});
	};

	// Get the index of each filter that has a value
	useEffect(() => {
		const newActiveFilters = keys.reduce((acc: number[], key, index) => {
			if (!isEmpty(filters[key])) return [...acc, index];
			return acc.filter((item) => item !== index);
		}, []);

		searchDispatch({
			type: 'SET_ADDITIONAL_FILTERS_ACTIVE',
			payload: {
				additionalFiltersActive: newActiveFilters,
			},
		});
	}, [filters]);

	return (
		<Fade in={searchActive} id='filterAdditional'>
			<Accordion w='full' allowMultiple defaultIndex={!isEmpty(additionalFiltersActive) ? [0] : []}>
				<SearchFilterAccordionItem
					heading='Additional Filters'
					headingProps={{
						fontSize: '2xl',
					}}
				>
					{/* The order of these items must match the order of filters in the useEffect. */}
					<Accordion allowMultiple={true} w='full' defaultIndex={additionalFiltersActive}>
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
					</Accordion>
				</SearchFilterAccordionItem>
			</Accordion>
		</Fade>
	);
}

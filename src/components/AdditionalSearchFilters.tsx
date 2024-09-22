import { useContext, useEffect } from 'react';
import { Accordion } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { additionalFilterKeys } from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import useUserTaxonomies from '@queries/useUserTaxonomies';
import SearchFilterAccordionItem from '@common/SearchFilterAccordionItem';
import ProfileCheckboxGroup from '@common/inputs/ProfileCheckboxGroup';
import { useFormikContext } from 'formik';

export default function AdditionalSearchFilters() {
	const { values, setFieldValue } = useFormikContext<{
		locations: string[];
		unions: string[];
		experienceLevels: string[];
		genderIdentities: string[];
		personalIdentities: string[];
		racialIdentities: string[];
	}>();
	const { searchDispatch } = useContext(SearchContext);

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

	const handleInputChange = (name: string) => (newValue: string[]) => {
		setFieldValue(name, newValue);
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
			if (!isEmpty(values[key as keyof typeof values])) return [...acc, index];
			return acc.filter((item) => item !== index);
		}, []);

		searchDispatch({
			type: 'SET_ADDITIONAL_FILTERS_ACTIVE',
			payload: {
				additionalFiltersActive: newActiveFilters,
			},
		});
	}, [values, searchDispatch]);

	return (
		/* The order of these items must match the order of filters in the useEffect. */
		<Accordion
			allowMultiple={true}
			w={'full'}
			defaultIndex={additionalFilterKeys.reduce((acc: number[], key, index) => {
				if (!isEmpty(values[key as keyof typeof values])) return [...acc, index];
				return acc;
			}, [])}
			mt={0}
			pt={0}
		>
			<SearchFilterAccordionItem heading={'Locations'}>
				<ProfileCheckboxGroup
					name={'locations'}
					items={locationTerms}
					checked={values.locations}
					handleChange={handleInputChange('locations')}
					pt={0}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Unions'}>
				<ProfileCheckboxGroup
					name={'unions'}
					items={unionTerms}
					checked={values.unions}
					handleChange={handleInputChange('unions')}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Experience Levels'}>
				<ProfileCheckboxGroup
					name={'experienceLevels'}
					items={experienceLevelTerms}
					checked={values.experienceLevels}
					handleChange={handleInputChange('experienceLevels')}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Gender Identity'}>
				<ProfileCheckboxGroup
					name={'genderIdentities'}
					items={genderIdentityTerms}
					checked={values.genderIdentities}
					handleChange={handleInputChange('genderIdentities')}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Personal Identity'}>
				<ProfileCheckboxGroup
					name={'personalIdentities'}
					items={personalIdentityTerms}
					checked={values.personalIdentities}
					handleChange={handleInputChange('personalIdentities')}
				/>
			</SearchFilterAccordionItem>
			<SearchFilterAccordionItem heading={'Racial Identity'}>
				<ProfileCheckboxGroup
					name={'racialIdentities'}
					items={racialIdentityTerms}
					checked={values.racialIdentities}
					handleChange={handleInputChange('racialIdentities')}
				/>
			</SearchFilterAccordionItem>
		</Accordion>
	);
}

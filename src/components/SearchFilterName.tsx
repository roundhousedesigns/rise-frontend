import { useContext, useEffect } from 'react';
import { Box, Flex, Icon, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { Formik, Form, Field, FieldInputProps } from 'formik';
import { FiSearch, FiXCircle } from 'react-icons/fi';
import { convertUnscoredToScored } from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useSearchByName from '@queries/useSearchByName';
import TextInput from '@common/inputs/TextInput';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

interface Props {
	[prop: string]: any;
}

export default function SearchFilterName({ ...props }: Props) {
	const {
		search: {
			filters: { name },
			results,
		},
		searchDispatch,
	} = useContext(SearchContext);

	const { closeDrawer } = useContext(SearchDrawerContext);

	const [getSearchResults, { data: { usersByName } = [], loading }] = useSearchByName();
	const navigate = useNavigate();

	useEffect(() => {
		if (isEqual(usersByName, results) || !usersByName) return;

		const searchByNameResults = convertUnscoredToScored(usersByName);

		searchDispatch({
			type: 'SET_RESULTS',
			payload: {
				results: searchByNameResults,
			},
		});
	}, [usersByName]);

	const handleSubmit = (values: { name: string }) => {
		getSearchResults({
			variables: {
				name: values.name,
			},
		})
			.then(() => {
				navigate('/results');
				closeDrawer();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<Box {...props}>
			<Formik initialValues={{ name }} onSubmit={handleSubmit} enableReinitialize>
				{({ values, setFieldValue }) => (
					<Form id='search-by-name'>
						<Flex gap={2} justifyContent='space-between' maxW='lg'>
							<Field name='name'>
								{({ field }: { field: FieldInputProps<string> }) => (
									<TextInput
										{...field}
										placeholder='Name'
										leftElement={<Icon as={FiSearch} />}
										label='Search by name'
										labelHidden
										sizeToken='sm'
										flex='1 0 60%'
									/>
								)}
							</Field>

							<Stack
								direction='row'
								w={values.name ? 'auto' : 0}
								overflow='hidden'
								transition='width 250ms ease, opacity 250ms ease'
							>
								<TooltipIconButton
									icon={<FiXCircle />}
									onClick={() => setFieldValue('name', '')}
									label='Clear name'
									colorScheme='orange'
									size='sm'
									isDisabled={!values.name || loading}
								/>
								<TooltipIconButton
									label='Search'
									colorScheme='green'
									type='submit'
									form='search-by-name'
									size='sm'
									isDisabled={!values.name}
									isLoading={loading}
									icon={<FiSearch />}
								/>
							</Stack>
						</Flex>
					</Form>
				)}
			</Formik>
		</Box>
	);
}

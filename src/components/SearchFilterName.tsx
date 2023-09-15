import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { Accordion, Flex, IconButton } from '@chakra-ui/react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

import TextInput from './common/inputs/TextInput';
import SearchFilterAccordionItem from './common/SearchFilterAccordionItem';
import { SearchContext } from '../context/SearchContext';
import useSearchByName from '../hooks/queries/useSearchByName';
import SearchDrawerContext from '../context/SearchDrawerContext';

export default function SearchFilterName() {
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
	const [open, setOpen] = useState<boolean>(false);

	// Set open to true if `name` is truthy
	useEffect(() => {
		if (name) setOpen(true);
	}, [name]);

	// Set the results after a search
	useEffect(() => {
		if (isEqual(usersByName, results) || !usersByName) return;

		searchDispatch({
			type: 'SET_RESULTS',
			payload: {
				results: usersByName,
			},
		});
	}, [usersByName]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		e.preventDefault();

		const { value } = e.target;

		searchDispatch({
			type: 'SET_NAME',
			payload: {
				name: value,
			},
		});
	};

	const handleClear = () => {
		searchDispatch({
			type: 'SET_NAME',
			payload: {
				name: '',
			},
		});
	};

	// Handle form submission
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		getSearchResults({
			variables: {
				name,
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
		<Accordion
			allowMultiple={true}
			index={open ? [0] : []}
			onChange={() => setOpen(!open)}
			w='full'
		>
			<SearchFilterAccordionItem heading='Search by Name'>
				<form id='search-by-name' onSubmit={handleSubmit}>
					<Flex gap={2} justifyContent='space-between'>
						<TextInput
							placeholder='Name'
							name='name'
							label='Name'
							labelHidden
							value={name}
							onChange={handleInputChange}
							w='3xl'
							flex='1 0 60%'
							inputProps={{
								borderWidth: '2px',
								borderColor: 'gray.400',
							}}
						/>
						<IconButton
							icon={<FiXCircle />}
							onClick={handleClear}
							aria-label='Clear name'
							colorScheme='orange'
							isDisabled={!name}
						/>
						<IconButton
							aria-label='Search by name'
							colorScheme='green'
							type='submit'
							form='search-by-name'
							isDisabled={!name}
							isLoading={loading}
							icon={<FiSearch />}
						/>
					</Flex>
				</form>
			</SearchFilterAccordionItem>
		</Accordion>
	);
}

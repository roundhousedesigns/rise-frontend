import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { Accordion, Button, IconButton, Wrap } from '@chakra-ui/react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

import TextInput from './common/inputs/TextInput';
import SearchFilterAccordionItem from './common/SearchFilterAccordionItem';
import { SearchContext } from '../context/SearchContext';
import { useSearchByName } from '../hooks/queries/useSearchByName';

export default function SearchFilterName() {
	const {
		search: {
			filters: { name },
			results,
			searchDrawerClose,
		},
		searchDispatch,
	} = useContext(SearchContext);

	const [getSearchResults, { data: { usersByName } = [] }] = useSearchByName();
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
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		getSearchResults({
			variables: {
				name,
			},
			// fetchPolicy: 'network-only',
		})
			.then(() => {
				navigate('/results');
				searchDrawerClose();
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
					<Wrap>
						<TextInput
							placeholder='Name'
							name='name'
							label='Name'
							labelHidden
							value={name}
							onChange={handleInputChange}
							w='3xl'
							flex={1}
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
						<Button
							leftIcon={<FiSearch />}
							aria-label='Search by name'
							colorScheme='green'
							type='submit'
							form='search-by-name'
							isDisabled={!name}
						>
							Search by name
						</Button>
					</Wrap>
				</form>
			</SearchFilterAccordionItem>
		</Accordion>
	);
}
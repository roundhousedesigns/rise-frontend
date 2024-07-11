import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { FiSearch, FiXCircle } from 'react-icons/fi';
import { convertUnscoredToScored } from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useSearchByName from '@hooks/queries/useSearchByName';
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
	const [_ignored, setOpen] = useState<boolean>(false);

	// Set open to true if `name` is truthy
	useEffect(() => {
		if (name) setOpen(true);
	}, [name]);

	// Set the results after a search
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
		<Box {...props}>
			<form id='search-by-name' onSubmit={handleSubmit}>
				<Flex gap={2} justifyContent='space-between' maxW='lg'>
					<TextInput
						placeholder='Name'
						name='name'
						label='Name'
						labelHidden
						value={name}
						onChange={handleInputChange}
						flex='1 0 60%'
					/>
					<TooltipIconButton
						icon={<FiXCircle />}
						onClick={handleClear}
						label='Clear name'
						colorScheme='orange'
						isDisabled={!name || loading}
					/>
					<TooltipIconButton
						label='Search'
						colorScheme='green'
						type='submit'
						form='search-by-name'
						isDisabled={!name}
						isLoading={loading}
						icon={<FiSearch />}
					/>
				</Flex>
			</form>
		</Box>
	);
}

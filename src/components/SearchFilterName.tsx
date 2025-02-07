import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Box, BoxProps, Flex, Icon, Stack, chakra } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { FiSearch, FiXCircle } from 'react-icons/fi';
import { convertUnscoredToScored } from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useSearchByName from '@queries/useSearchByName';
import TextInput from '@common/inputs/TextInput';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

export default function SearchFilterName({ ...props }: BoxProps) {
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

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
			<chakra.form id={'search-by-name'} onSubmit={handleSubmit}>
				<Flex gap={2} justifyContent={'space-between'} maxW='lg'>
					<TextInput
						placeholder='Name'
						leftElement={<Icon as={FiSearch} />}
						name='name'
						label={'Search by name'}
						labelHidden
						value={name}
						sizeToken='sm'
						onChange={handleInputChange}
						flex={'1 0 60%'}
					/>

					<Stack
						direction='row'
						w={name ? 'auto' : 0}
						overflow='hidden'
						transition={'width 250ms ease, opacity 250ms ease'}
					>
						<TooltipIconButton
							icon={<FiXCircle />}
							onClick={handleClear}
							label={'Clear name'}
							colorScheme='orange'
							size='sm'
							isDisabled={!name || loading}
						/>
						<TooltipIconButton
							label='Search'
							colorScheme='green'
							type='submit'
							form={'search-by-name'}
							size='sm'
							isDisabled={!name}
							isLoading={loading}
							icon={<FiSearch />}
						/>
					</Stack>
				</Flex>
			</chakra.form>
		</Box>
	);
}

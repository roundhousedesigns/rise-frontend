import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Text, Flex, Heading, IconButton, useToken } from '@chakra-ui/react';
import { FiBookmark } from 'react-icons/fi';
import { Candidate } from '../lib/classes';
import useViewer from '../hooks/queries/useViewer';
import useUpdateStarredProfiles from '../hooks/mutations/useUpdateStarredProfiles';

interface Props {
	candidate: Candidate;
	[prop: string]: any;
}

const CandidateItem = ({ candidate, ...props }: Props) => {
	const { id, image, slug, selfTitle } = candidate;
	const { loggedInId, starredProfiles } = useViewer();

	const [brandOrange, lightGray] = useToken('colors', ['brand.orange', 'gray.300']);

	const isStarred = useMemo(() => {
		if (!id) return;

		return starredProfiles.includes(id);
	}, [id, starredProfiles]);

	const { updateStarredProfilesMutation, results: mutationResults } = useUpdateStarredProfiles();

	const updateStarredProfilesHandler = () => {
		if (!id) return;

		const updatedStarredProfiles = isStarred
			? starredProfiles.filter((profileId) => profileId !== id)
			: [...starredProfiles, id];

		updateStarredProfilesMutation(loggedInId, updatedStarredProfiles).catch((err) => {
			console.error(err);
		});
	};

	return (
		<Flex alignItems='center'>
			<IconButton
				icon={
					<FiBookmark
						color={isStarred ? brandOrange : ''}
						fill={isStarred ? brandOrange : 'transparent'}
						stroke={lightGray}
						strokeWidth={2}
					/>
				}
				aria-label={
					isStarred ? 'Remove this candidate from your saved candidates' : 'Save this candidate'
				}
				title="Toggle bookmark"
				onClick={updateStarredProfilesHandler}
				boxSize={10}
				size='xl'
				isLoading={mutationResults.loading}
				bg='transparent'
				py={2}
				px={1}
				cursor='pointer'
			/>
			<Card
				flex={1}
				as={RouterLink}
				to={`/profile/${slug}`}
				py={2}
				my={0}
				_dark={{
					_hover: {
						bg: 'gray.700',
					},
				}}
				_light={{
					_hover: {
						bg: 'gray.50',
					},
				}}
				{...props}
			>
				<Flex
					direction='row'
					justifyContent='flex-start'
					alignItems='center'
					flexWrap={{ base: 'wrap', md: 'nowrap' }}
					gap={{ base: 'initial', md: 0 }}
				>
					<Avatar
						size='md'
						name={candidate.fullName()}
						flex='0 0 auto'
						mr={2}
						src={image}
						ignoreFallback={image ? true : false}
					/>
					<Heading
						as='h3'
						fontSize='lg'
						fontWeight='normal'
						textAlign='left'
						flex='1'
						mt={0}
						mb={{ base: 1, lg: 0 }}
					>
						{candidate.fullName() ? candidate.fullName() : 'No name'}
					</Heading>
					<Text
						textAlign='right'
						ml={{ base: '0 !important', lg: 'initial' }}
						flex='1'
						noOfLines={1}
					>
						{selfTitle}
					</Text>
				</Flex>
			</Card>
		</Flex>
	);
};

export default CandidateItem;

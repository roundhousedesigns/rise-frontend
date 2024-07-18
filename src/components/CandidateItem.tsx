import { useContext } from 'react';
import { Card, Avatar, Text, Flex, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Candidate } from '@lib/classes';
import { SearchContext } from '@context/SearchContext';
import useViewer from '@hooks/queries/useViewer';
import useUserProfile from '@hooks/queries/useUserProfile';
import StarToggleIcon from '@common/StarToggleIcon';
import CandidateAvatarBadge from '@components/CandidateAvatarBadge';

interface Props {
	candidate: Candidate;
	[prop: string]: any;
}

const CandidateItem = ({ candidate, ...props }: Props) => {
	const { id, image, slug, selfTitle } = candidate || {};

	const [profile] = useUserProfile(id ? id : 0);
	const { conflictRanges } = profile || {};
	const [{ loggedInId }] = useViewer();

	const {
		search: {
			filters: {
				filterSet: { jobDates },
			},
		},
	} = useContext(SearchContext);

	const hasDateConflict =
		conflictRanges && jobDates && jobDates.startDate ? jobDates.hasConflict(conflictRanges) : false;

	return id ? (
		<Flex alignItems='center'>
			<StarToggleIcon id={id} isDisabled={loggedInId === id} />

			<Card
				flex={1}
				as={RouterLink}
				to={`/profile/${slug}`}
				py={{ base: 2, md: 3 }}
				px={2}
				mr={4}
				my={0}
				_dark={{
					_hover: {
						bg: 'gray.700',
					},
				}}
				_light={{
					_hover: {
						bg: 'gray.200',
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
					>
						<CandidateAvatarBadge reason={hasDateConflict ? 'dateConflict' : undefined} />
					</Avatar>
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
						fontSize='sm'
						flex='1'
						noOfLines={2}
						style={{ hyphens: 'auto' }}
						wordBreak='break-word'
					>
						{selfTitle}
					</Text>
				</Flex>
			</Card>
		</Flex>
	) : (
		<></>
	);
};

export default CandidateItem;

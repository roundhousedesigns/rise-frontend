import { useContext } from 'react';
import { Card, Avatar, Text, Flex, Heading, CardProps } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Candidate } from '@lib/classes';
import { SearchContext } from '@context/SearchContext';
import useViewer from '@queries/useViewer';
import useUserProfile from '@queries/useUserProfile';
import StarToggleIcon from '@common/StarToggleIcon';
import CandidateAvatarBadge from '@components/CandidateAvatarBadge';

interface Props {
	candidate: Candidate;
	showToggle?: boolean;
}

const CandidateItem = ({ candidate, showToggle = true, ...props }: Props & CardProps) => {
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
			{showToggle ? <StarToggleIcon id={id} isDisabled={loggedInId === id} /> : null}

			<Card
				role='article'
				aria-labelledby={`candidate-${id}`}
				flex={1}
				as={RouterLink}
				to={`/profile/${slug}`}
				variant='listItem'
				{...props}
			>
				<Flex
					direction='row'
					justifyContent={'flex-start'}
					alignItems='center'
					flexWrap={{ base: 'wrap', md: 'nowrap' }}
					gap={{ base: 'initial', md: 0 }}
				>
					<Avatar
						size='md'
						name={candidate.fullName()}
						flex={'0 0 auto'}
						mr={2}
						src={image}
						ignoreFallback={image ? true : false}
						aria-label={candidate.fullName() || 'Profile picture'}
					>
						<CandidateAvatarBadge reason={hasDateConflict ? 'dateConflict' : undefined} />
					</Avatar>
					<Flex flex='1' alignItems='center' flexWrap='wrap'>
						<Heading
							as='h3'
							id={`candidate-${id}`}
							fontSize='lg'
							fontWeight='normal'
							textAlign='left'
							flex={{ base: '0 0 100%', md: '1' }}
							mt={0}
							mb={{ base: '4px', md: 0 }}
						>
							{candidate.fullName() ? candidate.fullName() : 'No name'}
						</Heading>
						<Text
							textAlign={{ base: 'left', md: 'right' }}
							ml={{ base: '0 !important', lg: 'initial' }}
							my={0}
							lineHeight={{ base: 'normal' }}
							fontSize='sm'
							noOfLines={2}
							flex={{ base: '0 0 100%', md: '1' }} // '1'}
							style={{ hyphens: 'auto' }}
							wordBreak={'break-word'}
						>
							{selfTitle}
						</Text>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	) : (
		<></>
	);
};

export default CandidateItem;

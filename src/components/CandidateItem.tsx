import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Text, Flex, Heading } from '@chakra-ui/react';
import { Candidate } from '../lib/classes';
import useViewer from '../hooks/queries/useViewer';
import BookmarkToggleIcon from './common/BookmarkToggleIcon';

interface Props {
	candidate: Candidate;
	[prop: string]: any;
}

const CandidateItem = ({ candidate, ...props }: Props) => {
	const { id, image, slug, selfTitle } = candidate;
	const { loggedInId, starredProfiles } = useViewer();

	const isStarred = starredProfiles.includes(Number(id));

	return (
		<Flex alignItems='center'>
			{id ? (
				<BookmarkToggleIcon id={id} isStarred={isStarred} isDisabled={loggedInId === id} />
			) : (
				false
			)}
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

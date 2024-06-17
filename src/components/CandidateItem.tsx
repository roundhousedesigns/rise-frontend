import { Card, Avatar, Text, Flex, Heading, AvatarBadge, Icon, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Candidate } from '@lib/classes';
import useViewer from '@hooks/queries/useViewer';
import BookmarkToggleIcon from '@common/BookmarkToggleIcon';
import RemoveBookmarkIcon from '@common/RemoveBookmarkIcon';
import CandidateAvatarBadge from './CandidateAvatarBadge';

interface Props {
	candidate: Candidate;
	onRemove?: (id: number) => () => void;
	[prop: string]: any;
}

// TODO Get conflictDates search params

const CandidateItem = ({ candidate, onRemove, ...props }: Props) => {
	
	const { loggedInId } = useViewer();

	const { id, image, slug, selfTitle } = candidate || {};

	if (!id) return null;

	return (
		<Flex alignItems='center'>
			{!!onRemove ? (
				<RemoveBookmarkIcon id={id} handleRemoveBookmark={onRemove(id)} />
			) : (
				<BookmarkToggleIcon id={id} isDisabled={loggedInId === id} />
			)}
			<Card
				flex={1}
				as={RouterLink}
				to={`/profile/${slug}`}
				py={{ base: 2, md: 3 }}
				px={2}
				mr={4}
				my={0}
				borderWidth={2}
				variant='gray'
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
						<CandidateAvatarBadge reason='dateConflict' />
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
	);
};

export default CandidateItem;

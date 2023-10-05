import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Text, Flex, Heading } from '@chakra-ui/react';
import { Candidate } from '../lib/classes';
import useViewer from '@hooks/queries/useViewer';
import BookmarkToggleIcon from '@common/BookmarkToggleIcon';
import RemoveBookmarkIcon from '@common/RemoveBookmarkIcon';

interface Props {
	candidate: Candidate;
	onRemove?: (id: number) => () => void;
	[prop: string]: any;
}

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
				py={2}
				my={0}
				_dark={{
					bg: 'gray.800',
					_hover: {
						bg: 'gray.900',
					},
				}}
				_light={{
					bg: 'gray.100',
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

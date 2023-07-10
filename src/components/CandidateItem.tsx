import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Text, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';
import { Candidate } from '../lib/classes';
import useToggleStarredProfile from '../hooks/mutations/useToggleStarredProfile';
import useViewer from '../hooks/queries/useViewer';
import { useEffect, useState, useCallback } from 'react';

// TODO type remove and add Candidate
interface Props {
	candidate: Candidate;
	removeCandidate?: any;
	addCandidate?: any;
	loggedInId: number;
	defaultStar: any;
	[prop: string]: any;
}

export default function CandidateItem({ candidate, removeCandidate, addCandidate, loggedInId, defaultStar, ...props }: Props) {
	const { id, image, slug, selfTitle } = candidate;
	// const { loggedInId } = useViewer();
	const [isStarred, setIsStarred] = useState<boolean>(defaultStar);

	// const handleDeleteCandidate = useCallback(() => {
	// 	console.log('CI - handleDeleteCandidate')
	// 	removeCandidate(candidate);
	// }, [candidate, removeCandidate]);

	const {
		toggleStarredProfileMutation,
		results: { loading },
	} = useToggleStarredProfile();

	// TODO Why do we need to prefix 'MouseEvent' with 'React'?
	const toggleStarredProfileHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log('CI - toggleStarredProfileHandler')
		console.log('id: ', id, 'loggedInId: ', loggedInId, 'isStarred: ', isStarred)
		event.preventDefault();
		event.stopPropagation();

		if (!id) return;

		if (isStarred) {
			removeCandidate(id);
		} else {
			addCandidate(id);
		}

		setIsStarred(!isStarred)

		// toggleStarredProfileMutation(loggedInId, id)
		// 	.then((res) => {
		// 		setIsStarred(!!isStarred);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
	};

	// toggleStarredProfileMutation(loggedInId, 360);
	// toggleStarredProfileMutation(loggedInId, 84);
	// toggleStarredProfileMutation(loggedInId, 8);
	// toggleStarredProfileMutation(loggedInId, 2);
	// toggleStarredProfileMutation(loggedInId, 82);
	// toggleStarredProfileMutation(loggedInId, 214);

	return (
		<Flex alignItems='center'>
			<IconButton
				as={FiStar}
				aria-label="Toggle candidate's starred status"
				onClick={toggleStarredProfileHandler}
				color={isStarred ? 'brand.yellow' : ''}
				fill={isStarred ? 'brand.yellow' : ''}
				boxSize={8}
				isLoading={loading}
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
					<Avatar size='md' name={candidate.fullName()} flex='0 0 auto' mr={2} src={image} />
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
}

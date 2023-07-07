import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Text, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';
import { Candidate } from '../lib/classes';
import useToggleStarredProfile from '../hooks/mutations/useToggleStarredProfile';
import useViewer from '../hooks/queries/useViewer';
import { useEffect, useState } from 'react';

interface Props {
	candidate: Candidate;
	[prop: string]: any;
}

export default function CandidateItem({ candidate, ...props }: Props) {
	const { id, image, slug, selfTitle } = candidate;
	const { loggedInId, starredProfiles } = useViewer();
	const [isStarred, setIsStarred] = useState<boolean>(false);

	const {
		toggleStarredProfileMutation,
		results: { loading },
	} = useToggleStarredProfile();

	// Set the state of the star icon based on whether the profile is starred
	useEffect(() => {
		if (!id) return;

		if (starredProfiles.includes(id) && !isStarred) {
			setIsStarred(true);
		} else if (!starredProfiles.includes(id) && isStarred) {
			setIsStarred(false);
		}
	}, [id, starredProfiles]);

	// TODO Why do we need to prefix 'MouseEvent' with 'React'?
	const toggleStarredProfileHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (!id) return;

		toggleStarredProfileMutation(loggedInId, id)
			.then((res) => {
				setIsStarred(!!isStarred);
			})
			.catch((err) => {
				console.error(err);
			});
	};

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

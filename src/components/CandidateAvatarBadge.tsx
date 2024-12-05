import { AvatarBadge, Icon } from '@chakra-ui/react';
import type { As } from '@chakra-ui/system';
import { FiCalendar } from 'react-icons/fi';

interface Props {
	reason?: string;
}

export default function CandidateAvatarBadge({ reason }: Props): JSX.Element | null {
	if (!reason) return null;

	const badgeProps: {
		label: string;
		icon: As | undefined;
		bgColor: string;
		color: string;
	} = {
		label: '',
		icon: undefined,
		bgColor: '',
		color: '',
	};

	switch (reason) {
		case 'dateConflict':
			badgeProps.label = 'Possible scheduling conflict';
			badgeProps.icon = FiCalendar;
			badgeProps.bgColor = 'red.300';
			badgeProps.color = 'text.dark';
			break;

		default:
			return null;
	}

	return (
		<AvatarBadge
			boxSize={6}
			borderWidth={2}
			bg={badgeProps.bgColor}
			color={badgeProps.color}
			aria-label={badgeProps.label}
		>
			<Icon as={badgeProps.icon} boxSize={3} aria-label='hidden' />
		</AvatarBadge>
	);
}

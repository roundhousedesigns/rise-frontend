import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileNoticeAlert } from '@/lib/types';

interface Props {
	code: string;
	status?: string;
	[prop: string]: any;
}

const profileNoticeAlerts: { [code: string]: ProfileNoticeAlert } = {
	no_credits: {
		title: "You haven't added any professional credits.",
		description: 'Add some to allow people to find you in the Directory!',
		cta: {
			button: {
				to: '/profile/edit',
				text: 'Edit your profile',
			},
		},
	},
	profile_disabled: {
		title: 'Your profile is currently hidden.',
		description: 'Make your profile public to appear in searches.',
		cta: {
			button: {
				to: '/settings',
				text: 'Settings',
			},
		},
	},
};

export default function ProfileNotice({ code, status = 'info', ...props }: Props): JSX.Element {
	const notice = profileNoticeAlerts[code];

	if (!notice) return <></>;

	const { title, description, cta } = notice;

	// HACK: Ensure 'warning' has the yellow color scheme
	const colorScheme = status === 'warning' ? 'yellow' : undefined;

	const CTA = (): JSX.Element => {
		return cta ? (
			<>
				<Spacer />
				{cta?.element ? (
					cta.element
				) : cta?.button ? (
					<Button as={RouterLink} to={cta.button.to} colorScheme={colorScheme}>
						{cta.button.text}
					</Button>
				) : (
					<></>
				)}
			</>
		) : (
			<></>
		);
	};

	return (
		<Alert
			status='warning'
			colorScheme='yellow'
			variant='subtle'
			fontSize='lg'
			borderWidth={2}
			borderColor='brand.yellow'
			my={0}
			justifyContent='space-between'
			{...props}
		>
			<AlertIcon />
			<AlertTitle>{title}</AlertTitle>
			{description ? <AlertDescription>{description} </AlertDescription> : false}
			<CTA />
		</Alert>
	);
}

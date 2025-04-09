import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	CloseButton,
	Container,
	Link,
	Collapse,
	Spacer,
	useDisclosure,
	LightMode,
	Flex,
	AlertProps,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileNoticeAlert } from '@lib/types';
import { getCookie, setCookie } from '@lib/utils';

interface Props {
	code: string;
	status?: string;
	dismissExpire?: number;
}

export default function ProfileNotice({
	code,
	status = 'info',
	dismissExpire = 30,
	...props
}: Props & AlertProps): JSX.Element {
	const notice = profileNoticeAlerts[code];
	const cookieName = `profile_notice_${code}_dismissed`;

	const dismissedCookieSet = getCookie(cookieName) ? true : false;
	const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: !dismissedCookieSet });

	if (!notice) return <></>;

	const { title, description, cta } = notice;

	const colorScheme = status === 'warning' ? 'orange' : undefined;
	const color = status === 'warning' ? 'text.dark' : undefined;

	const CTA = (): JSX.Element => (
		<>
			<Spacer />
			{cta?.element ? (
				cta.element
			) : cta?.button ? (
				<Button as={RouterLink} to={cta.button.to}>
					{cta.button.text}
				</Button>
			) : (
				<></>
			)}
		</>
	);

	const handleCloseAlert = () => {
		onClose();
		setCookie(`profile_notice_${code}_dismissed`, 1, dismissExpire);
	};

	return (
		<Collapse in={isVisible} unmountOnExit>
			<LightMode>
				<Alert
					status='warning'
					colorScheme={colorScheme}
					color={color}
					variant='subtle'
					fontSize='xs'
					borderRadius={0}
					py={0}
					my={0}
					justifyContent={'space-between'}
					{...props}
				>
					<Container maxW='90vw'>
						<Flex alignItems='center'>
							<AlertIcon />
							<AlertTitle lineHeight='unset'>{title}</AlertTitle>
							{description ? (
								<AlertDescription lineHeight='unset'>{description} </AlertDescription>
							) : (
								false
							)}

							{cta ? <CTA /> : <Spacer />}

							<CloseButton onClick={handleCloseAlert} />
						</Flex>
					</Container>
				</Alert>
			</LightMode>
		</Collapse>
	);
}

const profileNoticeAlerts: { [code: string]: ProfileNoticeAlert } = {
	no_credits: {
		title: "You haven't added any professional credits.",
		description: (
			<>
				<Link
					as={RouterLink}
					to={'/profile/edit'}
					variant='dotted'
					color='text.dark'
					borderBottomColor={'blackAlpha.800'}
				>
					Add some credits
				</Link>{' '}
				to allow people to find you in the Directory!
			</>
		),
	},
	profile_disabled: {
		title: 'Your profile is currently hidden.',
		description: (
			<>
				<Link as={RouterLink} to={'/settings'} color={'text.dark'} textDecorationColor='initial'>
					Go public
				</Link>
				{'.'}
			</>
		),
	},
};

import { ReactElement } from 'react';
import { IconButton, Link } from '@chakra-ui/react';
import { socialLink } from '@lib/utils';

interface Props {
	label: string;
	name: string;
	value: string;
	icon: ReactElement;
}

export default function SocialIcon({ label, name, value, icon }: Props) {
	return (
		<Link href={socialLink(name, value)} isExternal display={'block'} my={0}>
			<IconButton
				colorScheme={'blue'}
				borderRadius={'full'}
				boxSize={12}
				aria-label={label}
				icon={icon}
			/>
		</Link>
	);
}

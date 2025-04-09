import { ReactElement } from 'react';
import { IconButton, Link } from '@chakra-ui/react';
import { socialLink } from '@lib/utils';

interface Props {
	label: string;
	name: string;
	value: string;
	icon: ReactElement;
	boxSize?: number;
}

export default function SocialIcon({ label, name, value, icon, boxSize = 12 }: Props) {
	return (
		<Link href={socialLink(name, value)} isExternal display='block' my={0}>
			<IconButton
				colorScheme='blue'
				borderRadius='full'
				boxSize={boxSize}
				aria-label={label}
				icon={icon}
			/>
		</Link>
	);
}

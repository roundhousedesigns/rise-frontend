import React from 'react';
import { Stack, IconButton, Link } from '@chakra-ui/react';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiGlobe } from 'react-icons/fi';
import { Socials } from '../../lib/types';
import { socialLink } from '../../lib/utils';

interface Props {
	socials: Socials;
	url?: string;
}

/**
 * Generates a social media link based on the platform name and handle or url.
 *
 * @param {string} name The social media platform pretty name.
 * @param {string} label The social media platform label.
 * @param {string} value The social media platform handle or link.
 * @param {React.ReactElement} icon The social media platform icon element
 * @returns
 */
const socialIcon = (label: string, name: string, value: string, icon: React.ReactElement) => (
	<Link href={socialLink(name, value)} isExternal>
		<IconButton variant='socialRound' aria-label={label} icon={icon} />
	</Link>
);

export default function SocialLinks({ socials, url }: Props): JSX.Element {
	const { facebook, twitter, instagram, linkedin } = socials;

	return (
		<Stack direction='row' spacing={4}>
			{linkedin && socialIcon('LinkedIn', 'linkedin', linkedin, <FiLinkedin />)}
			{facebook && socialIcon('Facebook', 'facebook', facebook, <FiFacebook />)}
			{twitter && socialIcon('Twitter', 'twitter', twitter, <FiTwitter />)}
			{instagram && socialIcon('Instagram', 'instagram', instagram, <FiInstagram />)}

			{url ? (
				<Link href={url} isExternal>
					<IconButton variant='socialRound' aria-label='Personal url' icon={<FiGlobe />} />
				</Link>
			) : null}
		</Stack>
	);
}

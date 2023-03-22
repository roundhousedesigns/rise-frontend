import React from 'react';
import { Wrap, IconButton, Link } from '@chakra-ui/react';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiGlobe } from 'react-icons/fi';
import { PersonalLinks } from '../../lib/classes';
import { socialLink } from '../../lib/utils';

interface Props {
	socials: PersonalLinks;
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
	<Link href={socialLink(name, value)} isExternal display='block'>
		<IconButton variant='socialRound' aria-label={label} icon={icon} />
	</Link>
);

export default function PersonalIconLinks({ socials }: Props): JSX.Element {
	const { facebook, twitter, instagram, linkedin, website } = socials;

	return (
		<Wrap direction='row' spacing={4}>
			{linkedin && socialIcon('LinkedIn', 'linkedin', linkedin, <FiLinkedin />)}
			{facebook && socialIcon('Facebook', 'facebook', facebook, <FiFacebook />)}
			{twitter && socialIcon('Twitter', 'twitter', twitter, <FiTwitter />)}
			{instagram && socialIcon('Instagram', 'instagram', instagram, <FiInstagram />)}
			{website && socialIcon('Website', 'website', website, <FiGlobe />)}
		</Wrap>
	);
}
